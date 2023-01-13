import { Job } from "./../modules/job/entities/job.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { createTransport, SendMailOptions, getTestMessageUrl } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { ConfigProps } from "src/config/configValidationSchema";
import { VerificationTokenPayload } from "./interfaces/VerificationTokenPayload.interface";
import Handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";

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
        // this.nodeMailerTransporter.use(
        //     "compile",
        //     hbs({
        //         viewEngine: {
        //             extname: ".hbs", // handlebars extension
        //             layoutsDir: "src/email/templates", // location of handlebars templates
        //             defaultLayout: "JobFound", // name of main template
        //             partialsDir: "src/email/templates", // location of your subtemplates aka. header, footer etc
        //         },
        //         viewPath: "src/email/templates",
        //         extName: ".hbs",
        //     }),
        // );
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

    public async sendVerificationLink(email: string) {
        const payload: VerificationTokenPayload = { email };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_EMAIL_VERIFICATION_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>(
                "JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME",
            ),
        });
        const url = `${this.configService.get<string>("EMAIL_CONFIRMATION_URL")}?token=${token}`;
        const text = `Welcome to the Employees News Weekly. \nTo confirm the email address, click here: ${url}`;
        await this.sendMail({
            to: email,
            subject: "Email Confirmation",
            text,
        });
        return token;
    }

    async sendJobMail(user: User, job: Job) {
        const html = `<h1>Title: ${job.title}</h1>`;
        const templateStr = fs
            .readFileSync(path.resolve(__dirname, "templates/JobFound.hbs"))
            .toString("utf8");
        console.log(templateStr);

        const template = Handlebars.compile(templateStr, { noEscape: true });
        const payload = {
            to: user.email,
            from: this.configService.get<string>("EMAIL_USER"),
            subject: "New Job Posted - Apply Now",
            html: template({ name: `rahul` }),
        };
        return this.sendMail(payload);
    }

    async sendReminderMail(user: User, job: Job) {
        const html = `<h1>Title: ${job.title}</h1>`;
        const templateStr = fs
            .readFileSync(path.resolve(__dirname, "templates/Reminder.hbs"))
            .toString("utf8");
        console.log(templateStr);

        const template = Handlebars.compile(templateStr, { noEscape: true });
        const payload = {
            to: user.email,
            from: this.configService.get<string>("EMAIL_USER"),
            subject: "Reminder for Job - Apply Fast",
            html: template({ name: `rahul` }),
        };
        return this.sendMail(payload);
    }
}
