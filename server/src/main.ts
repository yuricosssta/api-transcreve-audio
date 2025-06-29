import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({ limit: '50mb' }));
  await app.listen(3000);
  console.log('NestJS rodando em http://localhost:3000');
}
bootstrap();
