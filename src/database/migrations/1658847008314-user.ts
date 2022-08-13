import { MigrationInterface, QueryRunner } from "typeorm";

export class user1658847008314 implements MigrationInterface {
    name = "user1658847008314";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."enw_user_role_enum" AS ENUM('USER', 'SUPERUSER', 'DELETED', 'GHOST')`,
        );
        await queryRunner.query(
            `CREATE TABLE "enw_user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying, "email" character varying, "is_email_confirmed" boolean NOT NULL DEFAULT false, "phone" character varying, "is_phone_confirmed" boolean NOT NULL DEFAULT false, "role" "public"."enw_user_role_enum" NOT NULL DEFAULT 'GHOST', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae41044dee573c66991c0ae6d15" UNIQUE ("email"), CONSTRAINT "UQ_4a2f675e1967d45fe5f125452a1" UNIQUE ("phone"), CONSTRAINT "PK_360e86544b92ca5199dab82e6c1" PRIMARY KEY ("user_id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "enw_user"`);
        await queryRunner.query(`DROP TYPE "public"."enw_user_role_enum"`);
    }
}
