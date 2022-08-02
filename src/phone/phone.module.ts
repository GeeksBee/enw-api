import { Module } from "@nestjs/common";
import SmsService from "./sms.service";

@Module({
    providers: [
        {
            provide: "SmsServiceInterface",
            useClass: SmsService,
        },
    ],
    exports: [
        {
            provide: "SmsServiceInterface",
            useClass: SmsService,
        },
    ],
})
export class PhoneModule {}
