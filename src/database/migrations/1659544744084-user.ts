import { MigrationInterface, QueryRunner } from "typeorm";

export class user1659544744084 implements MigrationInterface {
    name = "user1659544744084";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "enw_session" ("session_id" SERIAL NOT NULL, "valid" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_6146e3785b9d03011513b39bb42" PRIMARY KEY ("session_id"))`,
        );
        await queryRunner.query(
            `ALTER TYPE "public"."enw_user_role_enum" RENAME TO "enw_user_role_enum_old"`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."enw_user_role_enum" AS ENUM('1', '2', '3', '4', '5', '6')`,
        );
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(
            `ALTER TABLE "enw_user" ALTER COLUMN "role" TYPE "public"."enw_user_role_enum" USING "role"::"text"::"public"."enw_user_role_enum"`,
        );
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" SET DEFAULT '5'`);
        await queryRunner.query(`DROP TYPE "public"."enw_user_role_enum_old"`);
        await queryRunner.query(
            `ALTER TABLE "enw_session" ADD CONSTRAINT "FK_d3c3db8d0b6eb0aa80445ef9db6" FOREIGN KEY ("userId") REFERENCES "enw_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "enw_session" DROP CONSTRAINT "FK_d3c3db8d0b6eb0aa80445ef9db6"`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."enw_user_role_enum_old" AS ENUM('USER', 'SUPERUSER', 'DELETED', 'GHOST')`,
        );
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(
            `ALTER TABLE "enw_user" ALTER COLUMN "role" TYPE "public"."enw_user_role_enum_old" USING "role"::"text"::"public"."enw_user_role_enum_old"`,
        );
        await queryRunner.query(`ALTER TABLE "enw_user" ALTER COLUMN "role" SET DEFAULT 'GHOST'`);
        await queryRunner.query(`DROP TYPE "public"."enw_user_role_enum"`);
        await queryRunner.query(
            `ALTER TYPE "public"."enw_user_role_enum_old" RENAME TO "enw_user_role_enum"`,
        );
        await queryRunner.query(`DROP TABLE "enw_session"`);
    }
}
