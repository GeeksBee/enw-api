import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/common/constants/swagger.constants";
import { userPrivateFields } from "src/modules/user/entities/user.entity";
import LoginAdminResponseDto from "../dtos/responses/loginAdminResponse.dto";
import { LocalAuthenticationGuard } from "../guards/localAuthentication.guard";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import AuthenticationService from "../services/auth.service";
import { omit } from "lodash";
import RequestSignUPDto from "../dtos/employer/requestSignUp.dto";
import LoginEmployerDto from "../dtos/employer/loginEmployer.dto";
import EmployerAuthenticationService from "../services/employer.auth.service";
import { EmailService } from "src/email/email.service";
import ConfirmEmailDto from "../dtos/confirmEmail.dto";
import { OrganisationService } from "src/modules/organisation/organisation.service";
import { Request } from "express";

@Controller("authentication/employer")
export default class EmployerAuthenticationController {
    constructor(
        private readonly authService: AuthenticationService,
        private readonly employerAuthService: EmployerAuthenticationService,
        private readonly emailService: EmailService,
        private readonly orgService: OrganisationService,
    ) {}

    // route to request joining
    @HttpCode(200)
    @ApiTags(apiTags.Authentication)
    @ApiBody({ type: RequestSignUPDto })
    @ApiResponse({
        status: 200,
        description: "The Signup Request has been successfully sent",
        type: LoginAdminResponseDto,
    })
    @Post("/request-signup")
    public async requestSignUp(
        @Body() requestSignUPDto: RequestSignUPDto,
        @Req() request: Request,
    ) {
        const employer = await this.employerAuthService.registerEmployer(requestSignUPDto);
        const token = await this.emailService.sendVerificationLink(employer.email);
        request.res.setHeader("debug-token", token); // TODO to be removed

        return {
            statusCode: 200,
            message: "SignUp request send successfully, check mail to find the link to register",
        };
    }

    @HttpCode(200)
    @ApiTags(apiTags.Authentication)
    @ApiBody({ type: LoginEmployerDto })
    @ApiResponse({
        status: 200,
        description: "The Employer has successfully logged in",
        type: LoginAdminResponseDto,
    })
    @UseGuards(LocalAuthenticationGuard)
    @Post("login")
    public async logIn(@Req() request: RequestWithUser) {
        const user = request.user;
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
        const refreshToken = await this.authService.getRefreshToken(user.id);
        request.res.setHeader("Set-Cookie", accessTokenCookie.cookie);
        // request.res.cookie("Authentication", accessTokenCookie.token, {
        //     maxAge: 1000 * 60 * 15,
        //     httpOnly: true,
        //     path: "",
        //     domain: "http://localhost:8080",
        // });
        return {
            user: omit(user, userPrivateFields),
            refreshToken,
            accessToken: accessTokenCookie.token,
        };
    }

    @HttpCode(200)
    @ApiTags(apiTags.Authentication)
    @ApiBody({ type: ConfirmEmailDto })
    @ApiResponse({
        status: 200,
        description: "The Employer has successfully logged in",
        type: LoginAdminResponseDto,
    })
    @Post("email-confirmation")
    async confirm(@Body() confirmationData: ConfirmEmailDto) {
        const email = await this.authService.decodeConfirmationToken(
            confirmationData.token,
            "EMAIL",
        );
        await this.authService.confirmEmail(email);
        await this.orgService.createOrganisation(email);
    }
}
