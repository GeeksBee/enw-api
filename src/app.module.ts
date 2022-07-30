import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./modules/user/user.module";
import { OrganisationModule } from "./modules/organisation/organisation.module";
import { JobModule } from "./modules/job/job.module";
import { UserProfileModule } from "./modules/userProfile/userProfile.module";
import { EmailModule } from "./email/email.module";
import configuration from "./config/configuration";
import configValidationSchema from "./config/configValidationSchema";
import { LoggerMiddleware } from "./common/middlewares/logRequest.middleware";
import { SessionModule } from './modules/session/session.module';

console.log(`.env.${process.env.NODE_ENV}`);

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`],
            load: [configuration],
            validationSchema: configValidationSchema,
            isGlobal: true,
        }),
        DatabaseModule,
        UserModule,
        OrganisationModule,
        JobModule,
        UserProfileModule,
        EmailModule,
        SessionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
