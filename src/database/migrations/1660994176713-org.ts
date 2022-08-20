import {MigrationInterface, QueryRunner} from "typeorm";

export class org1660994176713 implements MigrationInterface {
    name = 'org1660994176713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organisation_type_id" ("enwOrganisationAttributeOrganisationAttributeId" integer NOT NULL, "enwOrganisationTypeOrganisationTypeId" integer NOT NULL, CONSTRAINT "PK_6a452f81c0d1518664dc84cb190" PRIMARY KEY ("enwOrganisationAttributeOrganisationAttributeId", "enwOrganisationTypeOrganisationTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f14e38bf9815811fe06be48c8b" ON "organisation_type_id" ("enwOrganisationAttributeOrganisationAttributeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab522ef54147bf680418bb479d" ON "organisation_type_id" ("enwOrganisationTypeOrganisationTypeId") `);
        await queryRunner.query(`ALTER TABLE "organisation_type_id" ADD CONSTRAINT "FK_f14e38bf9815811fe06be48c8b3" FOREIGN KEY ("enwOrganisationAttributeOrganisationAttributeId") REFERENCES "enw_organisation_attribute"("organisation_attribute_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organisation_type_id" ADD CONSTRAINT "FK_ab522ef54147bf680418bb479d1" FOREIGN KEY ("enwOrganisationTypeOrganisationTypeId") REFERENCES "enw_organisation_type"("organisation_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisation_type_id" DROP CONSTRAINT "FK_ab522ef54147bf680418bb479d1"`);
        await queryRunner.query(`ALTER TABLE "organisation_type_id" DROP CONSTRAINT "FK_f14e38bf9815811fe06be48c8b3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab522ef54147bf680418bb479d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f14e38bf9815811fe06be48c8b"`);
        await queryRunner.query(`DROP TABLE "organisation_type_id"`);
    }

}
