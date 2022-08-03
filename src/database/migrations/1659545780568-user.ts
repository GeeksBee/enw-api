import {MigrationInterface, QueryRunner} from "typeorm";

export class user1659545780568 implements MigrationInterface {
    name = 'user1659545780568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."enw_user_role_enum" RENAME TO "enw_user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."enw_user_role_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" TYPE "public"."enw_user_role_enum" USING "role"::"text"::"public"."enw_user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" SET DEFAULT '4'`);
        await queryRunner.query(`DROP TYPE "public"."enw_user_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."enw_user_role_enum_old" AS ENUM('1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" TYPE "public"."enw_user_role_enum_old" USING "role"::"text"::"public"."enw_user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" SET DEFAULT '5'`);
        await queryRunner.query(`DROP TYPE "public"."enw_user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."enw_user_role_enum_old" RENAME TO "enw_user_role_enum"`);
    }

}
