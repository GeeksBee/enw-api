import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import Organisation from "src/modules/organisation/entities/organisation.entity";
import { StateEnum } from "../entities/job.entity";

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "lorem ipsum" })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "this is the title" })
    title: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 20030,
    })
    organisation: Organisation;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 18 })
    minAge: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 25 })
    maxAge: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2 })
    yearsOfExperience: number;

    @IsNotEmpty()
    @ApiProperty({ example: { start: 30000, end: 32000 } })
    salaryRange: {
        start: number;
        end: number;
    };

    @IsOptional()
    @ApiProperty({})
    vacancy: {
        GEN: number;
        GEN_EWS: number;
        OBC: number;
        ST: number;
        SC: number;
        PWD: number;
    };

    @IsString()
    @IsNotEmpty()
    pincode: string;

    @IsEnum(StateEnum)
    @IsOptional()
    state: StateEnum;
}
