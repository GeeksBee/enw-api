import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class CreateAdminDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export default CreateAdminDto;
