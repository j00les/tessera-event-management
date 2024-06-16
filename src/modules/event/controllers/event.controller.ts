import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { Event } from '../entities/event.entity';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event';
import {
  EventResponse,
  GetAllEventResponse,
} from 'src/swagger/events/events.schema';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiResponse({
    status: 200,
    type: GetAllEventResponse,
    description: 'List of events',
  })
  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    type: EventResponse,
  })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Event> {
    const foundEvent = await this.eventService.findOne(id);

    if (!foundEvent) {
      throw new NotFoundException('Event not found');
    }
    return foundEvent;
  }

  @ApiResponse({ status: 201, type: Event })
  @ApiBody({ type: CreateEventDto })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @Post('create')
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.create(createEventDto);
  }
}
