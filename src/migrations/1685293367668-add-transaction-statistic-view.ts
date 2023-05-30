import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransactionStatisticView1685293367668 implements MigrationInterface {
    name = 'AddTransactionStatisticView1685293367668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" SET DEFAULT 'write-off of money'`);
        await queryRunner.query(`CREATE VIEW "transaction_statistic_views" AS SELECT to_char(created_at, 'YYYY-MM') AS "date", type AS "type", CAST(COALESCE(SUM(amount), 0) as INTEGER) AS "total" FROM "transactions" "transaction" GROUP BY 1, 2`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","transaction_statistic_views","SELECT to_char(created_at, 'YYYY-MM') AS \"date\", type AS \"type\", CAST(COALESCE(SUM(amount), 0) as INTEGER) AS \"total\" FROM \"transactions\" \"transaction\" GROUP BY 1, 2"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","transaction_statistic_views","public"]);
        await queryRunner.query(`DROP VIEW "transaction_statistic_views"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" DROP DEFAULT`);
    }

}
