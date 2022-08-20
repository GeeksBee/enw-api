import {MigrationInterface, QueryRunner} from "typeorm";

export class org1661001074915 implements MigrationInterface {
    name = 'org1661001074915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_organisation_media" ADD "organisation_id" integer`);
        await queryRunner.query(`CREATE TYPE "public"."enw_organisation_organisation_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" ADD "organisation_type" "public"."enw_organisation_organisation_type_enum" NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_media" ADD CONSTRAINT "FK_70484d350f28c96778d390aadf7" FOREIGN KEY ("organisation_id") REFERENCES "enw_organisation"("organisation_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_organisation_media" DROP CONSTRAINT "FK_70484d350f28c96778d390aadf7"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" DROP COLUMN "organisation_type"`);
        await queryRunner.query(`DROP TYPE "public"."enw_organisation_organisation_type_enum"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_media" DROP COLUMN "organisation_id"`);
    }

}
