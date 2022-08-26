import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";
import { SkillsEnum } from "src/modules/job/entities/job.entity";
import { CreateUserProfileDto } from "./create-user-profile.dto";

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
    @IsArray()
    @IsOptional()
    @ApiProperty({
        example: [
            "Master of Art (M.A)",
            "Master of Science (M.Sc/M.S",
            "Bachelor of Veterinary Science",
            "Bachelor of Medicine",
        ],
    })
    skills: SkillsEnum[];
}
