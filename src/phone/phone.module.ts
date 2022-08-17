import { Module } from "@nestjs/common";
import OtpService from "./otp.service";
import SmsService from "./sms.service";

@Module({
    providers: [SmsService, OtpService],
    exports: [SmsService, OtpService],
})
export class PhoneModule {}
