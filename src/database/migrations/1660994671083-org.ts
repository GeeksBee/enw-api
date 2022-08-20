import {MigrationInterface, QueryRunner} from "typeorm";

export class org1660994671083 implements MigrationInterface {
    name = 'org1660994671083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enw_organisation_types_on_organisation_attributes" ("organisation_attribute_id" integer NOT NULL, "organisation_type_id" integer NOT NULL, CONSTRAINT "PK_289d4198d0860bf1a94fdeb3904" PRIMARY KEY ("organisation_attribute_id", "organisation_type_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b369775f5be58ec7283ac5f1dc" ON "enw_organisation_types_on_organisation_attributes" ("organisation_attribute_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cabc6a32b747239390199b0255" ON "enw_organisation_types_on_organisation_attributes" ("organisation_type_id") `);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" ADD CONSTRAINT "FK_b369775f5be58ec7283ac5f1dc7" FOREIGN KEY ("organisation_attribute_id") REFERENCES "enw_organisation_type"("organisation_type_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" ADD CONSTRAINT "FK_cabc6a32b747239390199b02552" FOREIGN KEY ("organisation_type_id") REFERENCES "enw_organisation_attribute"("organisation_attribute_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" DROP CONSTRAINT "FK_cabc6a32b747239390199b02552"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" DROP CONSTRAINT "FK_b369775f5be58ec7283ac5f1dc7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cabc6a32b747239390199b0255"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b369775f5be58ec7283ac5f1dc"`);
        await queryRunner.query(`DROP TABLE "enw_organisation_types_on_organisation_attributes"`);
    }

}
