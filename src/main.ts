import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { APIPrefix } from "./common/constants";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(APIPrefix.Version);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
