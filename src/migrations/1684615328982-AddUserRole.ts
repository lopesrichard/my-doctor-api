import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1684615328982 implements MigrationInterface {
    name = 'AddUserRole1684615328982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_6636aefca0bdad8933c7cc3e39\` ON \`patient\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`role\` enum ('ADMIN', 'PATIENT', 'DOCTOR') NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor\`
            ADD \`userId\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor\`
            ADD UNIQUE INDEX \`IDX_e573a17ab8b6eea2b7fe9905fa\` (\`userId\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_e573a17ab8b6eea2b7fe9905fa\` ON \`doctor\` (\`userId\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor\`
            ADD CONSTRAINT \`FK_e573a17ab8b6eea2b7fe9905fa8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`doctor\` DROP FOREIGN KEY \`FK_e573a17ab8b6eea2b7fe9905fa8\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_e573a17ab8b6eea2b7fe9905fa\` ON \`doctor\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor\` DROP INDEX \`IDX_e573a17ab8b6eea2b7fe9905fa\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor\` DROP COLUMN \`userId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`role\`
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_6636aefca0bdad8933c7cc3e39\` ON \`patient\` (\`userId\`)
        `);
    }

}
