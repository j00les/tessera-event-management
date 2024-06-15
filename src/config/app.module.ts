import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from 'src/modules/event/entities/event.entity';
import { City } from 'src/modules/city/entities/city.entity';

import { EventModule } from 'src/modules/event/event.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Event, City],
      synchronize: true,
    }),
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
