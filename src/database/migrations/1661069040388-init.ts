import {MigrationInterface, QueryRunner} from "typeorm";

export class init1661069040388 implements MigrationInterface {
    name = 'init1661069040388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."enw_organisation_media_media_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "enw_organisation_media" ("organisation_media_id" SERIAL NOT NULL, "media_type" "public"."enw_organisation_media_media_type_enum" NOT NULL DEFAULT '2', "link" character varying NOT NULL, "organisation_id" integer, CONSTRAINT "PK_1664e1ec8fad635e3eb0f3dd47e" PRIMARY KEY ("organisation_media_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."enw_organisation_organisation_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "enw_organisation" ("organisation_id" SERIAL NOT NULL, "description" character varying, "organisation_type" "public"."enw_organisation_organisation_type_enum" NOT NULL DEFAULT '0', "gstNumber" character varying, "PANnumber" character varying, "companyRegistrationNumber" character varying, "location" character varying, "address" character varying, "industry" character varying, "valid" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_f9192869a528f51286ec8f5eef" UNIQUE ("user_id"), CONSTRAINT "PK_ed9d675ffadaac4298d457a0629" PRIMARY KEY ("organisation_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."enw_user_role_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "enw_user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying, "email" character varying, "is_email_confirmed" boolean NOT NULL DEFAULT false, "phone" character varying, "is_phone_confirmed" boolean NOT NULL DEFAULT false, "role" "public"."enw_user_role_enum" NOT NULL DEFAULT '4', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae41044dee573c66991c0ae6d15" UNIQUE ("email"), CONSTRAINT "UQ_4a2f675e1967d45fe5f125452a1" UNIQUE ("phone"), CONSTRAINT "PK_360e86544b92ca5199dab82e6c1" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "enw_session" ("session_id" SERIAL NOT NULL, "valid" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_6146e3785b9d03011513b39bb42" PRIMARY KEY ("session_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."enw_payment_payment_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TYPE "public"."enw_payment_payment_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "enw_payment" ("payment_id" SERIAL NOT NULL, "payment_entity" character varying NOT NULL, "payment_entity_id" character varying NOT NULL, "payment_type" "public"."enw_payment_payment_type_enum" NOT NULL DEFAULT '2', "payment_status" "public"."enw_payment_payment_status_enum" NOT NULL DEFAULT '0', "receipt_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_abc4e7d3ec3abd383c9663f1bed" PRIMARY KEY ("payment_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."enw_signup_request_role_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "enw_signup_request" ("user_id" SERIAL NOT NULL, "content" character varying, "email" character varying, "is_email_confirmed" boolean NOT NULL DEFAULT false, "phone" character varying, "is_phone_confirmed" boolean NOT NULL DEFAULT false, "role" "public"."enw_signup_request_role_enum" NOT NULL DEFAULT '4', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "organisation_id" integer, CONSTRAINT "UQ_9b75d7c6c42eb3612f07df1f54d" UNIQUE ("email"), CONSTRAINT "UQ_a9a4e136e6da637dd6e9d5461ef" UNIQUE ("phone"), CONSTRAINT "REL_071776d25cdc19daca66878d63" UNIQUE ("organisation_id"), CONSTRAINT "PK_69a998f400a1faffdd30653610a" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_media" ADD CONSTRAINT "FK_70484d350f28c96778d390aadf7" FOREIGN KEY ("organisation_id") REFERENCES "enw_organisation"("organisation_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" ADD CONSTRAINT "FK_f9192869a528f51286ec8f5eefc" FOREIGN KEY ("user_id") REFERENCES "enw_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enw_session" ADD CONSTRAINT "FK_44711b8d77256dde3d21105bc0b" FOREIGN KEY ("user_id") REFERENCES "enw_user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enw_payment" ADD CONSTRAINT "FK_46af64f487d025f94da38a22cc1" FOREIGN KEY ("user_id") REFERENCES "enw_user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enw_signup_request" ADD CONSTRAINT "FK_071776d25cdc19daca66878d638" FOREIGN KEY ("organisation_id") REFERENCES "enw_organisation"("organisation_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_signup_request" DROP CONSTRAINT "FK_071776d25cdc19daca66878d638"`);
        await queryRunner.query(`ALTER TABLE "enw_payment" DROP CONSTRAINT "FK_46af64f487d025f94da38a22cc1"`);
        await queryRunner.query(`ALTER TABLE "enw_session" DROP CONSTRAINT "FK_44711b8d77256dde3d21105bc0b"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" DROP CONSTRAINT "FK_f9192869a528f51286ec8f5eefc"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_media" DROP CONSTRAINT "FK_70484d350f28c96778d390aadf7"`);
        await queryRunner.query(`DROP TABLE "enw_signup_request"`);
        await queryRunner.query(`DROP TYPE "public"."enw_signup_request_role_enum"`);
        await queryRunner.query(`DROP TABLE "enw_payment"`);
        await queryRunner.query(`DROP TYPE "public"."enw_payment_payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."enw_payment_payment_type_enum"`);
        await queryRunner.query(`DROP TABLE "enw_session"`);
        await queryRunner.query(`DROP TABLE "enw_user"`);
        await queryRunner.query(`DROP TYPE "public"."enw_user_role_enum"`);
        await queryRunner.query(`DROP TABLE "enw_organisation"`);
        await queryRunner.query(`DROP TYPE "public"."enw_organisation_organisation_type_enum"`);
        await queryRunner.query(`DROP TABLE "enw_organisation_media"`);
        await queryRunner.query(`DROP TYPE "public"."enw_organisation_media_media_type_enum"`);
    }

}
