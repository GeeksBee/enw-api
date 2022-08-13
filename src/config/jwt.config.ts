import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigProps } from "./configValidationSchema";

export const JwtAsyncConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService<ConfigProps>): Promise<JwtModuleOptions> => ({
        secret: configService.get("JWT_ACCESS_TOKEN_SECRET"),
        signOptions: {
            expiresIn: `${configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}s`,
        },
    }),
};
