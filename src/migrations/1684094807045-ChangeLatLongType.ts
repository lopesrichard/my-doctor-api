import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLatLongType1684094807045 implements MigrationInterface {
    name = 'ChangeLatLongType1684094807045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`address\` DROP COLUMN \`latitude\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD \`latitude\` float NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\` DROP COLUMN \`longitude\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD \`longitude\` float NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`address\` DROP COLUMN \`longitude\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD \`longitude\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\` DROP COLUMN \`latitude\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD \`latitude\` int NOT NULL
        `);
    }

}
