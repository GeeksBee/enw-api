import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { createTransport, SendMailOptions, getTestMessageUrl } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { ConfigProps } from "src/config/configValidationSchema";
import { VerificationTokenPayload } from "./interfaces/VerificationTokenPayload.interface";

@Injectable()
export class EmailService {
    private nodeMailerTransporter: Mail;
    private readonly logger = new Logger(EmailService.name);
    constructor(
        private readonly configService: ConfigService<ConfigProps>,
        private readonly jwtService: JwtService,
    ) {
        this.nodeMailerTransporter = createTransport({
            host: configService.get<string>("EMAIL_HOST"),
            port: configService.get<number>("EMAIL_PORT"),
            secure: configService.get<boolean>("EMAIL_SECURE"),
            auth: {
                user: configService.get<string>("EMAIL_USER"),
                pass: configService.get<string>("EMAIL_PASSWORD"),
            },
        });
    }

    public sendMail(payload: SendMailOptions) {
        return this.nodeMailerTransporter.sendMail(payload, (err, info) => {
            if (err) {
                this.logger.error(
                    err,
                    `Error Sending email ${err.message}`,
                    undefined,
                    EmailService.name,
                );
                return;
            }
            this.logger.log(`Message sent: ${info.messageId}`);
            this.logger.log(`Preview url: ${getTestMessageUrl(info)}`);
        });
    }

    public sendVerificationLink(email: string) {
        const payload: VerificationTokenPayload = { email };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_EMAIL_VERIFICATION_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>(
                "JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME",
            ),
        });
        const url = `${this.configService.get<string>("EMAIL_CONFIRMATION_URL")}?token=${token}`;
        const text = `Welcome to the Employees News Weekly. \nTo confirm the email address, click here: ${url}`;
        return this.sendMail({
            to: email,
            subject: "Email Confirmation",
            text,
        });
    }
}
