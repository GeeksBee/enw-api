import { Body, Controller, HttpException, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { apiTags } from "src/common/constants/swagger.constants";
import UserService from "src/modules/user/services/user.service";
import OtpService from "src/phone/otp.service";
import SmsService from "src/phone/sms.service";
import { SendOtpDto } from "../dtos/applicant/sendOtp.dto";
import { VerifyOtpDto } from "../dtos/applicant/verifyOtp.dto";
import LoginAdminResponseDto from "../dtos/responses/loginAdminResponse.dto";
import ApplicantAuthenticationService from "../services/applicant.auth.service";
import AuthenticationService from "../services/auth.service";
import { omit } from "lodash";
import { userPrivateFields } from "src/modules/user/entities/user.entity";

@Controller("authentication/applicant")
export default class ApplicantAuthenticationController {
    constructor(
        private readonly applicantAuthService: ApplicantAuthenticationService,
        private readonly authService: AuthenticationService,
        private readonly userService: UserService,
        private readonly otpService: OtpService,
        private readonly smsService: SmsService,
    ) {}

    private logger = new Logger(ApplicantAuthenticationController.name);

    @ApiTags(apiTags.Authentication)
    @ApiBody({ type: SendOtpDto })
    @ApiResponse({
        status: 200,
        description: "The Employer has successfully logged in",
        type: LoginAdminResponseDto,
    })
    @Post("send-otp")
    public async sendOTP(@Body() sendOtpData: SendOtpDto, @Res() response: Response) {
        const { phone } = sendOtpData;
        const otp = this.otpService.generateOtp();
        const hash = this.otpService.createOtpHash(otp, phone);
        const message = await this.smsService.sendMessage({
            to: phone,
            body: `Your One Time Login Password For ENW is ${otp}`,
        });
        this.logger.log(`message sent : ${message}`);

        response.setHeader("debug-otp", otp); // TODO to be removed

        // get user with the phone number
        const user = await this.userService.getByPhone(phone);

        if (user) return response.status(200).send({ phone, hash });
        else {
            await this.applicantAuthService.registerEmployer(sendOtpData);
            return response.status(201).send({ phone, hash });
        }
    }

    @ApiTags(apiTags.Authentication)
    @ApiBody({ type: VerifyOtpDto })
    @ApiResponse({
        status: 200,
        description: "The Employer has successfully logged in",
        type: LoginAdminResponseDto,
    })
    @Post("verify-otp")
    public async verifyOTP(@Body() verifyOtpData: VerifyOtpDto, @Res() response: Response) {
        const isValidOtp = this.otpService.verifyOTP(verifyOtpData);
        if (isValidOtp) {
            let user = await this.userService.getByPhone(verifyOtpData.phone);
            if (!user.isPhoneConfirmed) user = await this.userService.verifyPhone(user.id);
            const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
            const refreshToken = await this.authService.getRefreshToken(user.id);
            response.setHeader("Set-Cookie", accessTokenCookie.cookie);
            return response.status(200).send({
                user: omit(user, userPrivateFields),
                refreshToken,
                accessToken: accessTokenCookie.token,
            });
        } else {
            throw new HttpException("Invalid OTP", HttpStatus.FORBIDDEN);
        }
    }
}
