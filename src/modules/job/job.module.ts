import { EmailModule } from "src/email/email.module";
import { forwardRef, Module } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobGroup } from "./entities/jobGroup.entity";
import { Job } from "./entities/job.entity";
import { Remainder } from "src/modules/user-profile/entities/remainder.entity";

@Module({
    imports: [EmailModule, TypeOrmModule.forFeature([Job, JobGroup, Remainder])],
    controllers: [JobController],
    providers: [JobService],
    exports: [JobService],
})
export class JobModule {}
