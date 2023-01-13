import { CronService } from "./cron.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    exports: [CronService],
    providers: [CronService],
})
export class CronModule {}
