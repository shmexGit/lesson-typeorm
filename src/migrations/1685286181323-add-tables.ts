import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1685286181323 implements MigrationInterface {
    name = 'AddTables1685286181323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resources" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type_transaction" character varying, "amount" integer, "currency" character varying, "calculation_type" character varying, CONSTRAINT "UQ_f276c867b5752b7cc2c6c797b2b" UNIQUE ("name"), CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "amount" integer NOT NULL, "currency" character varying NOT NULL DEFAULT 'rub', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "calculation_type" character varying NOT NULL DEFAULT 'card', "resource_id" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8d57493cc797956d938f204e743" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8d57493cc797956d938f204e743"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "resources"`);
    }

}
