import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import AuthenticationService from "../services/auth.service";
import { omit } from "lodash";
import { userPrivateFields } from "src/modules/user/entities/user.entity";
import JwtAuthenticationGuard from "../guards/jwtAuthentication.guard";
import { ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { apiTags } from "src/common/constants/swagger.constants";
import JwtRefreshTokenAuthenticationGuard from "../guards/jwtRefreshTokenAuthentication.guard";
import LogoutDto from "../dtos/logout.dto";

@Controller("authentication")
export default class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @ApiHeader({
        name: "x-refresh",
    })
    @ApiTags(apiTags.Authentication)
    @UseGuards(JwtRefreshTokenAuthenticationGuard)
    @Get("refresh")
    refresh(@Req() request: RequestWithUser) {
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);

        request.res.setHeader("Set-Cookie", accessTokenCookie);
        return omit(request.user, userPrivateFields);
    }

    @ApiTags(apiTags.Authentication)
    @UseGuards(JwtAuthenticationGuard)
    @ApiBody({ type: LogoutDto })
    @Post("logout")
    public async logOut(
        @Body() logoutDto: LogoutDto,
        @Req() request: RequestWithUser,
        @Res() response: Response,
    ) {
        const { refreshToken } = logoutDto;
        await this.authService.revokeRefreshToken(refreshToken);
        response.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @ApiTags(apiTags.Authentication)
    @UseGuards(JwtAuthenticationGuard)
    @Get("me")
    public authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        return omit(user, userPrivateFields);
    }
}
