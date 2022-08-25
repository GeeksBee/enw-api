import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailService } from "src/email/email.service";
import { Between, Like, Repository } from "typeorm";
import User from "../user/entities/user.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { JobFilterDto } from "./dto/filter-dto";
import { JobGroupDto } from "./dto/job-group-dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { Job } from "./entities/job.entity";
import { JobGroup } from "./entities/jobGroup.entity";
import { Skill } from "./entities/skill.entity";

@Injectable()
export class JobService {
    constructor(
        private readonly emailService: EmailService,
        @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
        @InjectRepository(Job) private readonly jobRepo: Repository<Job>,
        @InjectRepository(JobGroup) private readonly jobGroupRepo: Repository<JobGroup>,
    ) {}

    async create(createJobDto: CreateJobDto) {
        const job = this.jobRepo.create(createJobDto);
        await this.jobRepo.save(job);

        // Send Email and notifications to right candidate
        this.sendMailsToEligibleUsers(job);

        return job;
    }

    async createJobGroup(jobGroup: JobGroupDto) {
        const newJobGroup = this.jobGroupRepo.create(jobGroup);
        await this.jobRepo.save(newJobGroup);
        return newJobGroup;
    }

    async findAllSkills() {
        return this.skillRepo.find();
    }

    async findAll() {
        const jobs = await this.jobRepo.find();
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
        const job = await this.jobRepo.findOne(jobId);
        job.viewcount++;
        await this.jobRepo.save(job);
    }

    async findOne(id: number) {
        const job = await this.jobRepo.findOneOrFail({
            where: { id },
        });
        return job;
    }

    async update(id: number, updateJobDto: UpdateJobDto) {
        return this.jobRepo.update(id, updateJobDto);
    }

    async remove(id: number) {
        const job = await this.jobRepo.findOneOrFail({
            where: {
                id,
            },
        });

        return this.jobRepo.softRemove(job);
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
    async filterJobs(filterDto: JobFilterDto): Promise<Job[]> {
        const jobs = this.jobRepo.find({
            where: {},
        });
        return jobs;
    }

    async search(searchTerm: string): Promise<Job[]> {
        const jobs = await this.jobRepo.find({
            where: {
                title: Like(`%${searchTerm}%`),
            },
        });
        return jobs;
    }

    async findIncompleteJobGroups(): Promise<JobGroup[]> {
        const jobGroups = await this.jobGroupRepo.find({
            where: {
                isComplete: false,
            },
        });
        return jobGroups;
    }
}
