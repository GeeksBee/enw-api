import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsEmpty,
    IsEnum,
    IsHalfWidth,
    isJSON,
    IsJSON,
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
    @ApiProperty({ example: "Description for job" })
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 24 })
    age: number;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: false })
    isPWD: boolean;

    @IsEnum(CategoryEnum)
    @IsNotEmpty()
    @ApiProperty({
        enum: CategoryEnum,
        example: CategoryEnum.GEN,
    })
    category: CategoryEnum;

    @IsEnum(ApplicantGender)
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        enum: CategoryEnum,
        example: CategoryEnum.GEN,
    })
    gender: ApplicantGender;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: false })
    isWillingToTravel: boolean;

    @IsOptional()
    @ApiProperty({
        example: {
            address1: "123 Main Street",
            address2: "69 Back Street",
            city: "Chennai",
            state: "Tamil Nadu",
            pincode: "601809",
            countryCode: "+91",
            district: "Chennai",
        },
    })
    address: ApplicantAddress;

    @IsEnum(StateEnum)
    @IsOptional()
    @ApiProperty({
        enum: StateEnum,
        example: StateEnum["Tamil Nadu"],
    })
    state: StateEnum;
}
