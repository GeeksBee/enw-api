import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigProps } from "./config/configValidationSchema";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { RedocModule } from "nestjs-redoc";
import { redocConfig } from "./config/redoc.config";
import * as cookieParser from "cookie-parser";
import * as basicAuth from "express-basic-auth";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        credentials: true,
        origin: true,
    });
    app.use(cookieParser());

    const configService = app.get(ConfigService<ConfigProps>);
    const swaggerConfig = new DocumentBuilder()
        .setTitle("Employee News Weekly API v1")
        .setDescription("API for Employee News Weekly portal")
        .setVersion("1.0.0")
        // .addCookieAuth("authentication")
        // .addSecurity('')
        .addBearerAuth(
            {
                description: "Default JWT Authorization",
                type: "http",
                in: "header",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
            "Authorization",
        )
        .build();

    const appService = app.get(AppService);
    appService.startAllCrons();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("docs", app, document);
    app.useGlobalPipes(new ValidationPipe());
    await RedocModule.setup("redocs", app, document, redocConfig);
    await app.listen(configService.get("PORT") || 3000);
}
bootstrap();
