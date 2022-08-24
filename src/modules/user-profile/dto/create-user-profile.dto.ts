import {
    IsBoolean,
    IsEmpty,
    IsEnum,
    IsHalfWidth,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { StateEnum } from "src/modules/job/entities/job.entity";
import { ApplicantAddress, ApplicantGender, CategoryEnum } from "./../entities/user-profile.entity";
export class CreateUserProfileDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    @IsBoolean()
    isPWD: boolean;

    @IsEnum(CategoryEnum)
    @IsNotEmpty()
    category: CategoryEnum;

    @IsEnum(ApplicantGender)
    @IsNotEmpty()
    gender: ApplicantGender;

    @IsNotEmpty()
    @IsBoolean()
    isWillingToTravel: boolean;

    @IsOptional()
    address: ApplicantAddress;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsEnum(StateEnum)
    @IsOptional()
    state: StateEnum;
}
