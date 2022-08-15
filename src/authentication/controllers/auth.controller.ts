import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import AuthenticationService from "../services/auth.service";
import { omit } from "lodash";
import { userPrivateFields } from "src/modules/user/entities/user.entity";
import JwtAuthenticationGuard from "../guards/jwtAuthentication.guard";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { apiTags } from "src/common/constants/swagger.constants";

@Controller("authentication")
export default class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @ApiTags(apiTags.Authentication)
    @UseGuards(JwtAuthenticationGuard)
    @Post("logout")
    public async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
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
