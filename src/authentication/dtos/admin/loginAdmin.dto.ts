import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

class LoginAdminDto {
    @IsEmail()
    @ApiProperty({
        description: "admin user email",
        example: "admin.one@enw.in",
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "password too weak",
    })
    @ApiProperty({
        description:
            "Has to match a regular expression: /((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/",
        example: "Root@69",
    })
    password: string;
}

export default LoginAdminDto;
