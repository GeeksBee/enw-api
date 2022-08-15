import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import RegisterAdminDto from "../dtos/admin/registerAdmin.dto";
import { LocalAuthenticationGuard } from "../guards/localAuthentication.guard";
import AdminAuthenticationService from "../services/admin.auth.service";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import AuthenticationService from "../services/auth.service";
import { omit } from "lodash";
import User, { userPrivateFields, UserRole } from "src/modules/user/entities/user.entity";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import LoginAdminDto from "../dtos/admin/loginAdmin.dto";
import LoginAdminResponseDto from "../dtos/responses/loginAdminResponse.dto";
import { ApiErrorResponse } from "src/common/decorators/apiResponses/apiErrorRes.decorator";
import RoleGuard from "../guards/role.guard";

@Controller("authentication/admin")
export default class AdminAuthenticationController {
    constructor(
        private readonly authService: AuthenticationService,
        private readonly adminAuthService: AdminAuthenticationService,
    ) {}

    @Post("register")
    @ApiBody({
        type: RegisterAdminDto,
        description: "Only user with role SUPERADMIN can create admin",
    })
    @ApiErrorResponse(400)
    @ApiResponse({
        status: 201,
        description: "Admin user Creation success",
        type: User,
    })
    @ApiTags("Authentication")
    @UseGuards(RoleGuard(UserRole.SUPERADMIN))
    public register(@Body() createAdminData: RegisterAdminDto) {
        return this.adminAuthService.registerAdmin(createAdminData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post("login")
    @ApiTags("Authentication")
    @ApiBody({ type: LoginAdminDto })
    @ApiResponse({
        status: 200,
        description: "A admin has successfully logged in",
        type: LoginAdminResponseDto,
    })
    public async logIn(@Req() request: RequestWithUser) {
        const user = request.user;
        console.log(user);
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
        const refreshToken = await this.authService.getRefreshToken(user.id);
        request.res.setHeader("Set-Cookie", accessTokenCookie);
        return { user: omit(user, userPrivateFields), refreshToken };
    }
}
