import { IsNotEmpty, IsString, Matches } from "class-validator";

class CreateApplicantDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[6-9]\d{9}$/, {
        message: "not a valid phone number",
    })
    phone: string;
}

export default CreateApplicantDto;
