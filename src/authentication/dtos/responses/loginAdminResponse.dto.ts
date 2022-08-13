import { ApiProperty } from "@nestjs/swagger";
import User, { userPrivateKeys } from "src/modules/user/entities/user.entity";

class LoginAdminResponseDto {
    @ApiProperty()
    user: Omit<typeof User, userPrivateKeys>;

    @ApiProperty()
    refreshToken: string;
}

export default LoginAdminResponseDto;
