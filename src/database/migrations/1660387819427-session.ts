import {MigrationInterface, QueryRunner} from "typeorm";

export class session1660387819427 implements MigrationInterface {
    name = 'session1660387819427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_session" ALTER COLUMN "valid" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enw_session" ALTER COLUMN "valid" DROP DEFAULT`);
    }

}
