import { Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import JwtAuthenticationGuard from "src/authentication/guards/jwtAuthentication.guard";
import { apiTags } from "src/common/constants/swagger.constants";
import { PaymentService } from "./payment.service";

@UseGuards(JwtAuthenticationGuard)
@Controller("payment")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @HttpCode(200)
    @ApiTags(apiTags.Payment)
    // @ApiBody({ type: LoginAdminDto })
    @ApiResponse({
        status: 200,
        description: "A admin has successfully logged in",
    })
    @Post("applicant/subscribe-notification")
    public async payApplicantNotificationSubscription() {
        const { id, currency, amount } = await this.paymentService.createOrder(499);
        return { id, currency, amount };
    }

    @HttpCode(200)
    @ApiTags(apiTags.Payment)
    // @ApiBody({ type: LoginAdminDto })
    @ApiResponse({
        status: 200,
        description: "A admin has successfully logged in",
    })
    @Post("applicant/newsletter-notification")
    public async payApplicantNewsLetterSubscription() {
        const { id, currency, amount } = await this.paymentService.createOrder(200);
        return { id, currency, amount };
    }

    @HttpCode(200)
    @ApiTags(apiTags.Payment)
    // @ApiBody({ type: LoginAdminDto })
    @ApiResponse({
        status: 200,
        description: "A admin has successfully logged in",
    })
    @Post("employer/job-advertisement")
    public async payEmployerJobAdvertisement() {
        const { id, currency, amount } = await this.paymentService.createOrder(5500);
        return { id, currency, amount };
    }

    @HttpCode(200)
    @ApiTags(apiTags.Payment)
    // @ApiBody({ type: LoginAdminDto })
    @ApiResponse({
        status: 200,
        description: "A admin has successfully logged in",
    })
    @Post("/verification")
    public async payVerification(@Req() request: Request) {
        console.log(request.body);
        const headerSignature = request.headers["x-razorpay-signature"] as string;
        const response = this.paymentService.verificationPayment(request.body, headerSignature);
        console.log(response);
        return {
            message: "OK",
        };
    }
}
