import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class JobFilterDto {
    @IsOptional()
    anything: any;
}
