import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1684099328426 implements MigrationInterface {
    name = 'AddUser1684099328426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`patient\`
            ADD \`userId\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`patient\`
            ADD UNIQUE INDEX \`IDX_6636aefca0bdad8933c7cc3e39\` (\`userId\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_6636aefca0bdad8933c7cc3e39\` ON \`patient\` (\`userId\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`patient\`
            ADD CONSTRAINT \`FK_6636aefca0bdad8933c7cc3e394\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`patient\` DROP FOREIGN KEY \`FK_6636aefca0bdad8933c7cc3e394\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_6636aefca0bdad8933c7cc3e39\` ON \`patient\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`patient\` DROP INDEX \`IDX_6636aefca0bdad8933c7cc3e39\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`patient\` DROP COLUMN \`userId\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    }

}
