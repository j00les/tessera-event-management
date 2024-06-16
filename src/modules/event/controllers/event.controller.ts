import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

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

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Event> {
    const foundEvent = await this.eventService.findOne(id);

    if (!foundEvent) {
      throw new NotFoundException('Event not found');
    }
    return foundEvent;
  }

  @Post('create')
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.create(createEventDto);
  }
}
