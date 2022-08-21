import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SendOtpDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[6-9]\d{9}$/)
    @ApiProperty({
        example: "9999999999",
    })
    phone: string;
}
