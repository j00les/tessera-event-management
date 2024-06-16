import { NestFactory } from '@nestjs/core';

import { AppDataSource } from 'data-source';
import { AppModule } from './config/app.module';
import { validationPipe } from './shared/pipes/validation.pipe';

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);

  await app.listen(3000);
}
bootstrap();
