import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

class LogoutDto {
    @ApiProperty({
        description: "refresh token from local storage",
    })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}

export default LogoutDto;
