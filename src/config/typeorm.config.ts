// require("dotenv").config({ path: "pathToENV" });
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

import * as dotenv from "dotenv";
import { ConfigProps } from "./configValidationSchema";
dotenv.config({ path: ".env.development" });

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (
        configService: ConfigService<ConfigProps>,
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: "postgres",

            url: configService.get("DATABASE_URL"),

            entities: ["dist/**/**/*.entity.js"],

            synchronize: false,
            logging: true,

            migrationsTableName: "migration",

            migrations: ["dist/**/**/migrations/*.js"],

            cli: {
                migrationsDir: "src/database/migrations",
            },

            ssl: { rejectUnauthorized: false },
        };
    },
    inject: [ConfigService],
};

export default {
    type: "postgres",

    url: process.env.DATABASE_URL,

    entities: ["dist/**/**/*.entity.js"],

    synchronize: false,
    // logger: new DatabaseLogger(),
    logging: true,

    migrationsTableName: "migration",

    migrations: ["dist/**/**/migrations/*.js"],

    cli: {
        migrationsDir: "src/database/migrations",
    },

    ssl: { rejectUnauthorized: false },
};
