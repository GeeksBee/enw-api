import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../../entities/user.entity";

class CreateAdminDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: UserRole;

    @IsNotEmpty()
    isEmailConfirmed: boolean;
}

export default CreateAdminDto;
