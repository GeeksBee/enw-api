import {MigrationInterface, QueryRunner} from "typeorm";

export class payment1660977378849 implements MigrationInterface {
    name = 'payment1660977378849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."enw_payment_payment_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TYPE "public"."enw_payment_payment_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "enw_payment" ("payment_id" SERIAL NOT NULL, "payment_entity" character varying NOT NULL, "payment_entity_id" character varying NOT NULL, "payment_type" "public"."enw_payment_payment_type_enum" NOT NULL DEFAULT '2', "payment_status" "public"."enw_payment_payment_status_enum" NOT NULL DEFAULT '0', "receipt_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_abc4e7d3ec3abd383c9663f1bed" PRIMARY KEY ("payment_id"))`);
        await queryRunner.query(`ALTER TABLE "enw_payment" ADD CONSTRAINT "FK_46af64f487d025f94da38a22cc1" FOREIGN KEY ("user_id") REFERENCES "enw_user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_payment" DROP CONSTRAINT "FK_46af64f487d025f94da38a22cc1"`);
        await queryRunner.query(`DROP TABLE "enw_payment"`);
        await queryRunner.query(`DROP TYPE "public"."enw_payment_payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."enw_payment_payment_type_enum"`);
    }

}
