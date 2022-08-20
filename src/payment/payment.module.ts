import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { RazorpayModule } from "nestjs-razorpay";
import { TypeOrmModule } from "@nestjs/typeorm";
import Payment from "./entities/payment.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment]),
        RazorpayModule.forRoot({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        }),
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
