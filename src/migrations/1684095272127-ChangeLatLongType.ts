import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLatLongType1684095272127 implements MigrationInterface {
    name = 'ChangeLatLongType1684095272127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`address\` DROP COLUMN \`latitude\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD \`latitude\` decimal(10, 8) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\` DROP COLUMN \`longitude\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD \`longitude\` decimal(11, 8) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`address\` DROP COLUMN \`longitude\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD \`longitude\` float(12) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\` DROP COLUMN \`latitude\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`address\`
            ADD \`latitude\` float(12) NOT NULL
        `);
    }

}
