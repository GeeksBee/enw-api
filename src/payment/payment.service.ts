import { Injectable } from "@nestjs/common";
import { InjectRazorpay } from "nestjs-razorpay";
import * as Razorpay from "razorpay";
import { nanoid } from "nanoid";
import { ConfigService } from "@nestjs/config";
import { ConfigProps } from "src/config/configValidationSchema";
import { CreateOrderReturn } from "./types";
import Payment from "./entities/payment.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import crypto from "crypto";

declare interface Razorpay {
    orders: {
        create: (options: { [x: string]: any }) => Promise<CreateOrderReturn>;
    };
}

@Injectable()
export class PaymentService {
    // private razor = new Razorpay();
    constructor(
        @InjectRepository(Payment) protected readonly paymentRepository: Repository<Payment>,
        @InjectRazorpay() private readonly razorpayClient: Razorpay,
        private readonly configService: ConfigService<ConfigProps>,
    ) {}

    public async createOrder(amount: number) {
        const payment_capture = 1;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: nanoid(),
            payment_capture,
        };
        const response = await this.razorpayClient.orders.create(options);
        console.log(response);
        return response;
    }

    public verificationPayment(webHookResponse: any, headerSignature: string) {
        const shasum = crypto.createHmac(
            "sha256",
            this.configService.get<string>("RAZORPAY_WEBHOOK_SECRET"),
        );
        shasum.update(JSON.stringify(webHookResponse));
        const digest = shasum.digest("hex");
        console.log(digest, headerSignature);
        if (digest === headerSignature) {
            console.log("request is legit");
            return webHookResponse;
        } else {
            throw new Error("Invalid Webhook Response");
        }
    }
}
