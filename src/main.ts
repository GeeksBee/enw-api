import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { APIPrefix } from "./common/constants";
import { ConfigProps } from "./config/configValidationSchema";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService<ConfigProps>);
    const swaggerConfig = new DocumentBuilder()
        .setTitle("Employee News Weekly API v1")
        .setDescription("API for Employee News Weekly portal")
        .setVersion("1.0.0")
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("docs", app, document);

    app.setGlobalPrefix(APIPrefix.Version);
    await app.listen(configService.get("PORT") || 3000);
}
bootstrap();
