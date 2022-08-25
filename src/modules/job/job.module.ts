import { EmailModule } from "src/email/email.module";
import { Module } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";

@Module({
    imports: [EmailModule],
    controllers: [JobController],
    providers: [JobService],
})
export class JobModule {}
