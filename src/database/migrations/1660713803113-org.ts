import {MigrationInterface, QueryRunner} from "typeorm";

export class org1660713803113 implements MigrationInterface {
    name = 'org1660713803113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_session" DROP CONSTRAINT "FK_44711b8d77256dde3d21105bc0b"`);
        await queryRunner.query(`CREATE TABLE "enw_organisation" ("organisation_id" SERIAL NOT NULL, "description" character varying, "valid" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_f9192869a528f51286ec8f5eef" UNIQUE ("user_id"), CONSTRAINT "PK_ed9d675ffadaac4298d457a0629" PRIMARY KEY ("organisation_id"))`);
        await queryRunner.query(`CREATE TABLE "enw_organisation_attribute" ("organisation_attribute_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_efb01cae307d20627eee7caf0b3" PRIMARY KEY ("organisation_attribute_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."enw_signup_request_role_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "enw_signup_request" ("user_id" SERIAL NOT NULL, "content" character varying, "email" character varying, "is_email_confirmed" boolean NOT NULL DEFAULT false, "phone" character varying, "is_phone_confirmed" boolean NOT NULL DEFAULT false, "role" "public"."enw_signup_request_role_enum" NOT NULL DEFAULT '4', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "organisation_id" integer, CONSTRAINT "UQ_9b75d7c6c42eb3612f07df1f54d" UNIQUE ("email"), CONSTRAINT "UQ_a9a4e136e6da637dd6e9d5461ef" UNIQUE ("phone"), CONSTRAINT "REL_071776d25cdc19daca66878d63" UNIQUE ("organisation_id"), CONSTRAINT "PK_69a998f400a1faffdd30653610a" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."enw_organisation_media_media_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "enw_organisation_media" ("organisation_media_id" SERIAL NOT NULL, "media_type" "public"."enw_organisation_media_media_type_enum" NOT NULL DEFAULT '2', "link" character varying NOT NULL, CONSTRAINT "PK_1664e1ec8fad635e3eb0f3dd47e" PRIMARY KEY ("organisation_media_id"))`);
        await queryRunner.query(`CREATE TABLE "enw_organisation_type" ("organisation_type_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8213c7876f29a659f3fdbacf4bd" PRIMARY KEY ("organisation_type_id"))`);
        await queryRunner.query(`CREATE TABLE "enw_organisation_attribute_value" ("organisation_attribute_value_id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_2228e31750e12ad72006a4e54c2" PRIMARY KEY ("organisation_attribute_value_id"))`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" ADD CONSTRAINT "FK_f9192869a528f51286ec8f5eefc" FOREIGN KEY ("user_id") REFERENCES "enw_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enw_session" ADD CONSTRAINT "FK_44711b8d77256dde3d21105bc0b" FOREIGN KEY ("user_id") REFERENCES "enw_user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enw_signup_request" ADD CONSTRAINT "FK_071776d25cdc19daca66878d638" FOREIGN KEY ("organisation_id") REFERENCES "enw_organisation"("organisation_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_signup_request" DROP CONSTRAINT "FK_071776d25cdc19daca66878d638"`);
        await queryRunner.query(`ALTER TABLE "enw_session" DROP CONSTRAINT "FK_44711b8d77256dde3d21105bc0b"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" DROP CONSTRAINT "FK_f9192869a528f51286ec8f5eefc"`);
        await queryRunner.query(`DROP TABLE "enw_organisation_attribute_value"`);
        await queryRunner.query(`DROP TABLE "enw_organisation_type"`);
        await queryRunner.query(`DROP TABLE "enw_organisation_media"`);
        await queryRunner.query(`DROP TYPE "public"."enw_organisation_media_media_type_enum"`);
        await queryRunner.query(`DROP TABLE "enw_signup_request"`);
        await queryRunner.query(`DROP TYPE "public"."enw_signup_request_role_enum"`);
        await queryRunner.query(`DROP TABLE "enw_organisation_attribute"`);
        await queryRunner.query(`DROP TABLE "enw_organisation"`);
        await queryRunner.query(`ALTER TABLE "enw_session" ADD CONSTRAINT "FK_44711b8d77256dde3d21105bc0b" FOREIGN KEY ("user_id") REFERENCES "enw_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
