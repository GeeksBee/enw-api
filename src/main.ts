import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigProps } from "./config/configValidationSchema";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { RedocModule } from "nestjs-redoc";
import { redocConfig } from "./config/redoc.config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    const configService = app.get(ConfigService<ConfigProps>);
    const swaggerConfig = new DocumentBuilder()
        .setTitle("Employee News Weekly API v1")
        .setDescription("API for Employee News Weekly portal")
        .setVersion("1.0.0")
        .addCookieAuth("authentication")
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("docs", app, document);
    app.useGlobalPipes(new ValidationPipe());
    await RedocModule.setup("redocs", app, document, redocConfig);
    await app.listen(configService.get("PORT") || 3000);
}
bootstrap();
