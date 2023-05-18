import fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { RequiredVariableError } from './errors/environment';
import * as Entities from './entities';
import * as Migrations from './migrations';

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
  entities: Entities,
  migrations: Migrations,
};

if (certificate) {
  options = { ...options, ssl: { ca: fs.readFileSync(certificate) } };
}

export const db = new DataSource(options);
