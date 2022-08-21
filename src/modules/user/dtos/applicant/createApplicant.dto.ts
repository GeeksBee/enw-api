import { IsNotEmpty, IsString } from "class-validator";

class CreateApplicantDto {
    @IsString()
    @IsNotEmpty()
    phone: string;
}

export default CreateApplicantDto;
