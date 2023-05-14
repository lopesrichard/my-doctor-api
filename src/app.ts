import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { db } from './data-source';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  dotenv.config();
  db.config();
  await db.connect();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.listen(3000);
}

main().catch(err => console.log(err));
