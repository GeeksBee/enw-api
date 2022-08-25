import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import OrganisationTypeEnum from "src/modules/organisation/entities/organisationType.enum";

export class UpdateOrganisationDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "Oil and Natural Gas Corporation",
    })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "Description for organisation",
    })
    description?: string;

    @IsEnum(OrganisationTypeEnum)
    @IsOptional()
    @ApiProperty({
        type: "number",
        enum: OrganisationTypeEnum,
        example: OrganisationTypeEnum.PUBLIC_SECTOR_UNDERTAKING,
    })
    organisationType: OrganisationTypeEnum;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "22 AAAAA0000A1Z5",
    })
    gstNumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "AAAAA0000A",
    })
    PANnumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "1234562210924",
    })
    companyRegistrationNumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "Bangalore, Karnataka",
    })
    location: string; // headquarters locations

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "123 Main Street, Electronic City, Bangalore, Karnataka, PIN-403100",
    })
    address: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "Telecommunication",
    })
    industry: string;
}
