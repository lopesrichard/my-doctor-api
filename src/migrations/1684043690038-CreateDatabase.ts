import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1684043690038 implements MigrationInterface {
    name = 'CreateDatabase1684043690038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`address\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`addressLine\` varchar(255) NOT NULL,
                \`latitude\` int NOT NULL,
                \`longitude\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`availability\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`dayOfWeek\` enum ('0', '1', '2', '3', '4', '5', '6') NOT NULL,
                \`startTime\` time NOT NULL,
                \`endTime\` time NOT NULL,
                \`doctorId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`specialty\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`code\` varchar(255) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`icon\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`doctor\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`fullname\` varchar(255) NOT NULL,
                \`registrationNumber\` varchar(255) NOT NULL,
                \`picture\` varchar(255) NOT NULL,
                \`rating\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`clinic\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`addressId\` int NOT NULL,
                UNIQUE INDEX \`REL_905abb487a9409f94ebeb2c8cb\` (\`addressId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`patient\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`fullname\` varchar(255) NOT NULL,
                \`document\` varchar(255) NOT NULL,
                \`picture\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`appointment\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`status\` enum ('1', '2', '3') NOT NULL,
                \`scheduledTo\` datetime NOT NULL,
                \`clinicId\` int NOT NULL,
                \`doctorId\` int NOT NULL,
                \`patientId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`doctor_specialties_specialty\` (
                \`doctorId\` int NOT NULL,
                \`specialtyId\` int NOT NULL,
                INDEX \`IDX_a5e8ddb469f2a276af4e0bf5ca\` (\`doctorId\`),
                INDEX \`IDX_dc058575b5cc77fe53c8a080b2\` (\`specialtyId\`),
                PRIMARY KEY (\`doctorId\`, \`specialtyId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`clinic_doctors_doctor\` (
                \`clinicId\` int NOT NULL,
                \`doctorId\` int NOT NULL,
                INDEX \`IDX_9eb54900314b95fdf7b5cd601e\` (\`clinicId\`),
                INDEX \`IDX_16baca4a1d55c887b503004ade\` (\`doctorId\`),
                PRIMARY KEY (\`clinicId\`, \`doctorId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`availability\`
            ADD CONSTRAINT \`FK_05b50765bd00c64bfe8052d2b6e\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`clinic\`
            ADD CONSTRAINT \`FK_905abb487a9409f94ebeb2c8cb9\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointment\`
            ADD CONSTRAINT \`FK_8fb4ae178c6bd844f42f69ae686\` FOREIGN KEY (\`clinicId\`) REFERENCES \`clinic\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointment\`
            ADD CONSTRAINT \`FK_514bcc3fb1b8140f85bf1cde6e2\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointment\`
            ADD CONSTRAINT \`FK_5ce4c3130796367c93cd817948e\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor_specialties_specialty\`
            ADD CONSTRAINT \`FK_a5e8ddb469f2a276af4e0bf5ca0\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor_specialties_specialty\`
            ADD CONSTRAINT \`FK_dc058575b5cc77fe53c8a080b28\` FOREIGN KEY (\`specialtyId\`) REFERENCES \`specialty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`clinic_doctors_doctor\`
            ADD CONSTRAINT \`FK_9eb54900314b95fdf7b5cd601e9\` FOREIGN KEY (\`clinicId\`) REFERENCES \`clinic\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`clinic_doctors_doctor\`
            ADD CONSTRAINT \`FK_16baca4a1d55c887b503004ade9\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`clinic_doctors_doctor\` DROP FOREIGN KEY \`FK_16baca4a1d55c887b503004ade9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`clinic_doctors_doctor\` DROP FOREIGN KEY \`FK_9eb54900314b95fdf7b5cd601e9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor_specialties_specialty\` DROP FOREIGN KEY \`FK_dc058575b5cc77fe53c8a080b28\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`doctor_specialties_specialty\` DROP FOREIGN KEY \`FK_a5e8ddb469f2a276af4e0bf5ca0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_5ce4c3130796367c93cd817948e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_514bcc3fb1b8140f85bf1cde6e2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_8fb4ae178c6bd844f42f69ae686\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`clinic\` DROP FOREIGN KEY \`FK_905abb487a9409f94ebeb2c8cb9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`availability\` DROP FOREIGN KEY \`FK_05b50765bd00c64bfe8052d2b6e\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_16baca4a1d55c887b503004ade\` ON \`clinic_doctors_doctor\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_9eb54900314b95fdf7b5cd601e\` ON \`clinic_doctors_doctor\`
        `);
        await queryRunner.query(`
            DROP TABLE \`clinic_doctors_doctor\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_dc058575b5cc77fe53c8a080b2\` ON \`doctor_specialties_specialty\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_a5e8ddb469f2a276af4e0bf5ca\` ON \`doctor_specialties_specialty\`
        `);
        await queryRunner.query(`
            DROP TABLE \`doctor_specialties_specialty\`
        `);
        await queryRunner.query(`
            DROP TABLE \`appointment\`
        `);
        await queryRunner.query(`
            DROP TABLE \`patient\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_905abb487a9409f94ebeb2c8cb\` ON \`clinic\`
        `);
        await queryRunner.query(`
            DROP TABLE \`clinic\`
        `);
        await queryRunner.query(`
            DROP TABLE \`doctor\`
        `);
        await queryRunner.query(`
            DROP TABLE \`specialty\`
        `);
        await queryRunner.query(`
            DROP TABLE \`availability\`
        `);
        await queryRunner.query(`
            DROP TABLE \`address\`
        `);
    }

}
