import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransactionUpdateTable1685437613797 implements MigrationInterface {
    name = 'AddTransactionUpdateTable1685437613797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction_updates" ("id" SERIAL NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE, "transaction_id" integer, CONSTRAINT "REL_d58814d2effd3754880e61d4f5" UNIQUE ("transaction_id"), CONSTRAINT "PK_bbb8b815c06e934c43a958448de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction_updates" ADD CONSTRAINT "FK_d58814d2effd3754880e61d4f5b" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_updates" DROP CONSTRAINT "FK_d58814d2effd3754880e61d4f5b"`);
        await queryRunner.query(`DROP TABLE "transaction_updates"`);
    }

}
