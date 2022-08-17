import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Logger,
    Post,
    Res,
} from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { apiTags } from "src/common/constants/swagger.constants";
import OtpService from "src/phone/otp.service";
import SmsService from "src/phone/sms.service";
import { SendOtpDto } from "../dtos/applicant/sendOtp.dto";
import { VerifyOtpDto } from "../dtos/applicant/verifyOtp.dto";
import LoginAdminResponseDto from "../dtos/responses/loginAdminResponse.dto";
import AuthenticationService from "../services/auth.service";

@Controller("authentication/applicant")
export default class ApplicantAuthenticationController {
    constructor(
        private readonly authService: AuthenticationService,
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
        await this.smsService.sendMessage({
            to: phone,
            body: `Your One Time Login Password For ENW is ${otp}`,
        });
        return response.status(200).send({ phone, hash });
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
            return response.status(200).send({
                statusCode: 200,
                message: "Phone number verified",
            });
        } else {
            throw new HttpException("Invalid OTP", HttpStatus.FORBIDDEN);
        }
    }
}
