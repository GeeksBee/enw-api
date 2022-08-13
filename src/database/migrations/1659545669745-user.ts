import { MigrationInterface, QueryRunner } from "typeorm";

export class user1659545669745 implements MigrationInterface {
    name = "user1659545669745";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "enw_session" DROP CONSTRAINT "FK_d3c3db8d0b6eb0aa80445ef9db6"`,
        );
        await queryRunner.query(`ALTER TABLE "enw_session" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(
            `ALTER TABLE "enw_session" ADD CONSTRAINT "FK_44711b8d77256dde3d21105bc0b" FOREIGN KEY ("user_id") REFERENCES "enw_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "enw_session" DROP CONSTRAINT "FK_44711b8d77256dde3d21105bc0b"`,
        );
        await queryRunner.query(`ALTER TABLE "enw_session" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(
            `ALTER TABLE "enw_session" ADD CONSTRAINT "FK_d3c3db8d0b6eb0aa80445ef9db6" FOREIGN KEY ("userId") REFERENCES "enw_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
