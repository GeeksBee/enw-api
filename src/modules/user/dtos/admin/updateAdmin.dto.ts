import { IsEmail, IsOptional, IsString } from "class-validator";

class UpdateAdminDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    name: string;
}

export default UpdateAdminDto;
