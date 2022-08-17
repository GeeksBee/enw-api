import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../../entities/user.entity";

class CreateEmployerDto {
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
}

export default CreateEmployerDto;
