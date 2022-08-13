import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateAdminDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsOptional()
    isEmailConfirmed?: boolean;
}

export default CreateAdminDto;
