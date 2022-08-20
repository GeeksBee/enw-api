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
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    EMAIL_SERVICE: Joi.string().required(),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASSWORD: Joi.string().required(),
    EMAIL_HOST: Joi.string().required(),
    EMAIL_PORT: Joi.number().required(),
    EMAIL_SECURE: Joi.boolean().required(),
    EMAIL_CONFIRMATION_URL: Joi.string().required(),
    JWT_EMAIL_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
    JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    PHONE_VERIFICATION_SECRET: Joi.string().required(),
    PHONE_VERIFICATION_EXPIRATION_TIME: Joi.string().required(),
    RAZORPAY_KEY_ID: Joi.string().required(),
    RAZORPAY_KEY_SECRET: Joi.string().required(),
    RAZORPAY_WEBHOOK_SECRET: Joi.string().required(),
});

export default configValidationSchema;

export type ConfigProps = {
    PORT: number;
    DATABASE_URL: string;
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_SENDER_PHONE_NUMBER: string;
    TWILIO_VERIFICATION_SERVICE_SID: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
    EMAIL_SERVICE: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_SECURE: boolean;
    EMAIL_CONFIRMATION_URL: string;
    JWT_EMAIL_VERIFICATION_TOKEN_SECRET: string;
    JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME: string;
    PHONE_VERIFICATION_SECRET: string;
    PHONE_VERIFICATION_EXPIRATION_TIME: string;
    RAZORPAY_KEY_ID: string;
    RAZORPAY_KEY_SECRET: string;
    RAZORPAY_WEBHOOK_SECRET: string;
} & publicConfigurationProps;
