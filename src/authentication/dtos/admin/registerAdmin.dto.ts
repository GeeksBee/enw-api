import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Match } from "../../../common/decorators/match.validate.decorator";

class RegisterAdminDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "password too weak",
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @Match<RegisterAdminDto>("password")
    confirmPassword: string;
}

export default RegisterAdminDto;
