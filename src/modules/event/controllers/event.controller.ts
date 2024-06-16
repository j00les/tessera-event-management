import { Body, Controller, Get, Post } from '@nestjs/common';

import { Event } from '../entities/event.entity';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Post('create')
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.create(createEventDto);
  }
}
