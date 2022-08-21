import {MigrationInterface, QueryRunner} from "typeorm";

export class org1661004547343 implements MigrationInterface {
    name = 'org1661004547343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_organisation" ADD "gstNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" ADD "PANnumber" character varying`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" ADD "companyRegistrationNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" ADD "location" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_organisation" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" DROP COLUMN "companyRegistrationNumber"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" DROP COLUMN "PANnumber"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation" DROP COLUMN "gstNumber"`);
    }

}
