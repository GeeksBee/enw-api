import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailService } from "src/email/email.service";
import { Between, Repository } from "typeorm";
import User from "../user/entities/user.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { Job } from "./entities/job.entity";
import { Skill } from "./entities/skill.entity";

@Injectable()
export class JobService {
    constructor(
        private readonly emailService: EmailService,
        @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
    ) {}
    async create(createJobDto: CreateJobDto) {
        const job = Job.create(createJobDto);
        await Job.save(job);

        // Send Email and notifications to right candidate
        this.sendMailsToEligibleUsers(job);

        return job;
    }

    async findAllSkills() {
        return this.skillRepo.find();
    }

    async findAll() {
        const jobs = await Job.find();
        jobs.forEach((job, index) => {
            if (!jobs[index].address) {
                jobs[index].address = {
                    address1: null,
                    address2: null,
                    city: null,
                    state: jobs[index].state,
                    pincode: null,
                    countryCode: null,
                    district: null,
                };
            }
        });
        return jobs;
    }

    async incrementView(jobId: number) {
        const job = await Job.findOne(jobId);
        job.viewcount++;
        await Job.save(job);
    }

    async findOne(id: number) {
        const job = await Job.findOneOrFail({
            where: { id },
        });
        return job;
    }

    async update(id: number, updateJobDto: any) {
        let job = await Job.findOneOrFail({
            where: {
                id,
            },
        });

        job = {
            ...job,
            ...updateJobDto,
        };

        await Job.save(job);
        return job;
    }

    async remove(id: number) {
        const job = await Job.findOneOrFail({
            where: {
                id,
            },
        });

        await Job.softRemove(job);
        return job;
    }

    async sendMailsToEligibleUsers(job: Job) {
        const eligibleUsers = await this.getEligibleUsers(job);
        return await this.sendJobMailToUsers(eligibleUsers, job);
    }

    async getEligibleUsers(job: Job): Promise<User[]> {
        const users = await User.find({
            where: {
                userProfile: {
                    // yearsOfExperience: {
                    //     gte: job.yearsOfExperience,
                    // },
                    // salaryRange: {
                    //     gte: job.salaryRange.start,
                    //     lte: job.salaryRange.end,
                    // },
                    age: Between(job.minAge, job.maxAge),
                },
            },
            relations: ["userProfile"],
        });

        return users;
    }

    async sendJobMailToUsers(users: User[], job: Job): Promise<boolean[]> {
        const success = [];
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            try {
                if (user.email) {
                    await this.emailService.sendJobMail(user, job);
                    success.push(true);
                } else {
                    success.push(false);
                }
            } catch (e) {
                success.push(false);
            }
        }
        return success;
    }
}
