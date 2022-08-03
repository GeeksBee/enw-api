import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Match } from "../../../../common/decorators/match.validate.decorator";

class ChangeAdminPasswordDto {
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
    @Match<ChangeAdminPasswordDto>("password")
    confirmPassword: string;
}

export default ChangeAdminPasswordDto;
