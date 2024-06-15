import { NestFactory } from '@nestjs/core';

import { AppModule } from './config/app.module';
import { AppDataSource } from 'data-source';

async function bootstrap() {
  await AppDataSource.initialize();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
