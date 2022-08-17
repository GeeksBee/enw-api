import { IsNotEmpty, IsString, Matches } from "class-validator";

export class VerifyOtpDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[6-9]\d{9}$/)
    phone: string;

    @IsString()
    @IsNotEmpty()
    hash: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}
