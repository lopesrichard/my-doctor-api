import fs from 'fs';
import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral } from 'typeorm';
import { RequiredVariableError } from './errors/environment';
import { Address } from './entities/address';
import { Appointment } from './entities/appointment';
import { Availability } from './entities/availability';
import { Clinic } from './entities/clinic';
import { Doctor } from './entities/doctor';
import { Patient } from './entities/patient';
import { Specialty } from './entities/specialty';

class Database {
  private db: DataSource;

  get(): DataSource {
    return this.db;
  }

  config() {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;
    const certificate = process.env.CA_PATH;

    if (!host) throw new RequiredVariableError('DB_HOST');
    if (!user) throw new RequiredVariableError('DB_USER');
    if (!database) throw new RequiredVariableError('DB_DATABASE');

    let options: DataSourceOptions = {
      type: 'mysql',
      host: host,
      port: 3306,
      username: user,
      password: password,
      database: database,
      logging: true,
      entities: [Address, Appointment, Availability, Clinic, Doctor, Patient, Specialty],
      migrations: ['src/migrations/*.ts'],
    };

    if (certificate) {
      options = { ...options, ssl: { ca: fs.readFileSync(certificate) } };
    }

    this.db = new DataSource(options);
  }

  async connect() {
    await this.db.initialize();
  }

  getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>) {
    return this.db.getRepository(target);
  }
}

export const db = new Database();
