import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppDataSource } from 'data-source';
import { AppModule } from './config/app.module';
import { validationPipe } from './shared/pipes/validation.pipe';

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tessera Event Management')
    .setDescription('api for creating and fetching city and event data')
    .setVersion('1.0')
    .addTag('Event Management API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(validationPipe);
  await app.listen(3000);
}
bootstrap();
