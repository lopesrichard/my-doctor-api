import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { db } from './data-source';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  await db.initialize();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.listen(3000);
}

main().catch(err => console.log(err));
