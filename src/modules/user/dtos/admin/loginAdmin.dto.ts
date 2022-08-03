import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class CreateAdminDto {
    @ApiProperty({
        description: "Email id of the admin user",
        example: "admin@enw.in",
    })
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export default CreateAdminDto;
