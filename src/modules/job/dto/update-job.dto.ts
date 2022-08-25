import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional } from "class-validator";
import { Skill } from "../entities/skill.entity";
import { CreateJobDto } from "./create-job.dto";

export class UpdateJobDto extends PartialType(CreateJobDto) {
    @IsBoolean()
    @IsOptional()
    published: boolean;

    @IsBoolean()
    @IsOptional()
    visible: boolean;

    @IsArray()
    @IsOptional()
    @ApiProperty({ example: [1, 2, 3] })
    skills: Skill[];
}
