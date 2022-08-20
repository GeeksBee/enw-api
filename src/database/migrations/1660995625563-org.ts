import {MigrationInterface, QueryRunner} from "typeorm";

export class org1660995625563 implements MigrationInterface {
    name = 'org1660995625563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" DROP CONSTRAINT "FK_b369775f5be58ec7283ac5f1dc7"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" DROP CONSTRAINT "FK_cabc6a32b747239390199b02552"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" ADD CONSTRAINT "FK_cabc6a32b747239390199b02552" FOREIGN KEY ("organisation_type_id") REFERENCES "enw_organisation_type"("organisation_type_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" ADD CONSTRAINT "FK_b369775f5be58ec7283ac5f1dc7" FOREIGN KEY ("organisation_attribute_id") REFERENCES "enw_organisation_attribute"("organisation_attribute_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" DROP CONSTRAINT "FK_b369775f5be58ec7283ac5f1dc7"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" DROP CONSTRAINT "FK_cabc6a32b747239390199b02552"`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" ADD CONSTRAINT "FK_cabc6a32b747239390199b02552" FOREIGN KEY ("organisation_type_id") REFERENCES "enw_organisation_attribute"("organisation_attribute_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enw_organisation_types_on_organisation_attributes" ADD CONSTRAINT "FK_b369775f5be58ec7283ac5f1dc7" FOREIGN KEY ("organisation_attribute_id") REFERENCES "enw_organisation_type"("organisation_type_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
