import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./modules/user/user.module";
import { EmailModule } from "./email/email.module";
import configuration from "./config/configuration";
import configValidationSchema from "./config/configValidationSchema";
import { LoggerMiddleware } from "./common/middlewares/logRequest.middleware";
import { AuthenticationModule } from "./authentication/authentication.module";
import { PhoneModule } from "./phone/phone.module";
import { OrganisationModule } from './modules/organisation/organisation.module';
import { PaymentModule } from './payment/payment.module';
import getEnvFilePath from "./common/utils/getEnvFilePath";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [getEnvFilePath()],
            load: [configuration],
            validationSchema: configValidationSchema,
            isGlobal: true,
        }),
        DatabaseModule,
        UserModule,
        EmailModule,
        AuthenticationModule,
        PhoneModule,
        OrganisationModule,
        PaymentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
