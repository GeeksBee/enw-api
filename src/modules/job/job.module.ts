import { EmailModule } from "src/email/email.module";
import { forwardRef, Module } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobGroup } from "./entities/jobGroup.entity";
import { Job } from "./entities/job.entity";
import { Skill } from "./entities/skill.entity";
import { UserModule } from "../user/user.module";

@Module({
    imports: [EmailModule, TypeOrmModule.forFeature([Job, JobGroup, Skill])],
    controllers: [JobController],
    providers: [JobService],
    exports: [JobService],
})
export class JobModule {}
