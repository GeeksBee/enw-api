import { IsEmail, IsOptional, IsString } from "class-validator";

class UpdateApplicantDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    name: string;
}

export default UpdateApplicantDto;
