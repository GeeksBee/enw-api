import { JobService } from "src/modules/job/job.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CronService } from "./cron";

@Injectable()
export class AppService {
    constructor(
        private readonly configService: ConfigService,
        private cronService: CronService,
        private jobService: JobService,
    ) {}
    getHello(): object {
        return { message: this.configService.get("healthCheckMessage") };
    }

    startAllCrons() {
        // Later save all the cron job data in App Params table
        // Asyncronously start all the cron jobs
        // For retrieval cron job, retrieve orders of all users asyncronously
        return this.cronService.registerJob({
            name: "dummy",
            context: this,
            cronTime: "*/1 * * * *",
            onTick: async () => {
                await this.jobService.sendReminderMailsCron();
            },
        });
    }
}
