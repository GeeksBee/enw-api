import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as otpGenerator from "otp-generator";
import { ConfigProps } from "src/config/configValidationSchema";

import { VerifyOtpDto } from "src/authentication/dtos/applicant/verifyOtp.dto";
import { createHmac } from "crypto";

@Injectable()
export default class OtpService {
    constructor(private readonly configService: ConfigService<ConfigProps>) {}

    public generateOtp(length = 6): string {
        return otpGenerator.generate(length, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });
    }

    public generateCode(length = 21): string {
        return otpGenerator.generate(length, {
            specialChars: false,
        });
    }

    public createOtpHash(otp: string, phone: string, expires?: string) {
        if (!expires) {
            expires = String(
                Date.now() + this.configService.get<number>("PHONE_VERIFICATION_EXPIRATION_TIME"),
            );
        }

        const data = `${phone}.${otp}.${expires}`;
        const hash = createHmac(
            "sha256",
            this.configService.get<string>("PHONE_VERIFICATION_SECRET"),
        )
            .update(data)
            .digest("hex");
        return `${hash}.${expires}`;
    }

    public verifyOTP(verifyOtpData: VerifyOtpDto): boolean {
        const { phone, otp, hash } = verifyOtpData;
        const [hashValue, expires] = hash.split(".");
        if (Date.now() > parseInt(expires)) {
            throw new HttpException("Otp Expired", HttpStatus.FORBIDDEN);
        }
        const compareHash = this.createOtpHash(otp, phone, expires).split(".")[0];
        return hashValue === compareHash;
    }
}
