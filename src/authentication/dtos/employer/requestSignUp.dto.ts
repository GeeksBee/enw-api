import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Match } from "../../../common/decorators/match.validate.decorator";

class RequestSignUPDto {
    @IsEmail()
    @ApiProperty({
        description: "employer user email",
        example: "employer.one@gmail.com",
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "employer user name",
        example: "Indiana Jones",
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "password too weak",
    })
    @ApiProperty({
        description:
            "Has to match a regular expression: /((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/",
        example: "AdminUserPassword@69",
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @Match<RequestSignUPDto>("password")
    @ApiProperty({
        description:
            "Has to match a password field and regular expression: /((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/",
        example: "AdminUserPassword@69",
    })
    confirmPassword: string;
}

export default RequestSignUPDto;
