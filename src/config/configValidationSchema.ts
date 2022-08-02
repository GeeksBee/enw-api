import * as Joi from "@hapi/joi";
import { publicConfigurationProps } from "./configuration";

/**
 * .env validation schema
 */
const configValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    TWILIO_ACCOUNT_SID: Joi.string().required(),
    TWILIO_AUTH_TOKEN: Joi.string().required(),
    TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
    TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
});

export default configValidationSchema;

export type ConfigProps = {
    PORT: number;
    DATABASE_URL: string;
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_SENDER_PHONE_NUMBER: string;
    TWILIO_VERIFICATION_SERVICE_SID: string;
} & publicConfigurationProps;
