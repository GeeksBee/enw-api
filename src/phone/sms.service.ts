import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigProps } from "src/config/configValidationSchema";
import SmsServiceInterface from "./interfaces/sms.service.interface";
import Twilio from "./mock/twilio.mock";

@Injectable()
export default class SmsService implements SmsServiceInterface {
    private twilioClient: Twilio;

    constructor(private readonly configService: ConfigService<ConfigProps>) {
        const accountSid = configService.get("TWILIO_ACCOUNT_SID");
        const authToken = configService.get("TWILIO_AUTH_TOKEN");

        this.twilioClient = new Twilio(accountSid, authToken);
    }

    public sendMessage(payload: { to: string; body: string }): Promise<string> {
        const senderPhoneNumber = this.configService.get("TWILIO_SENDER_PHONE_NUMBER");
        return this.twilioClient.messages.create({ ...payload, from: senderPhoneNumber });
    }
}
