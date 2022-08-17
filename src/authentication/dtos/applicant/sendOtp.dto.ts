import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SendOtpDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[6-9]\d{9}$/)
    phone: string;
}
