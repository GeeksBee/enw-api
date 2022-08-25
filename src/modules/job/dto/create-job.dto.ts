import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { StateEnum } from "../entities/job.entity";

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

    @IsEnum(StateEnum)
    @IsOptional()
    state: StateEnum;
}
