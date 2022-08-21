import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    organisationId: number;

    @IsNumber()
    @IsNotEmpty()
    minAge: number;

    @IsNumber()
    @IsNotEmpty()
    maxAge: number;

    @IsNumber()
    @IsNotEmpty()
    yearsOfExperience: number;

    @IsNotEmpty()
    salaryRange: {
        start: number;
        end: number;
    };

    @IsString()
    @IsNotEmpty()
    pincode: string;
}
