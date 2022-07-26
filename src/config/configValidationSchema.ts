import * as Joi from "@hapi/joi";
import { publicConfigurationProps } from "./configuration";

/**
 * .env validation schema
 */
const configValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    DATABASE_HOSTNAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
});

export default configValidationSchema;

export type ConfigProps = {
    PORT: number;
    DATABASE_HOSTNAME: string;
    DATABASE_PORT: number;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
} & publicConfigurationProps;
