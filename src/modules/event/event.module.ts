import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from './entities/event.entity';
import { City } from '../city/entities/city.entity';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, City])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
