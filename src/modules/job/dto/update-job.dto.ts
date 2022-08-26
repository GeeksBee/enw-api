import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional } from "class-validator";
import { Skill, SkillsEnum } from "../entities/job.entity";
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
    @ApiProperty({
        example: [
            "Master of Art (M.A)",
            "Master of Science (M.Sc/M.S)",
            "Bachelor of Veterinary Science",
        ],
    })
    skills: SkillsEnum[];
}
