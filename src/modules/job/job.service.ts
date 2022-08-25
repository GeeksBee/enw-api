import { Injectable } from "@nestjs/common";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { Job } from "./entities/job.entity";

@Injectable()
export class JobService {
    async create(createJobDto: CreateJobDto) {
        const job = Job.create(createJobDto);
        await Job.save(job);

        // Send Email and notifications to right candidate
        return job;
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
}
