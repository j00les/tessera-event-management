import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Event } from '../entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    console.log(
      await this.eventRepository.find({ relations: ['city'] }),
      '--debug gan ',
    );
    return this.eventRepository.find({ relations: ['city'] });
  }
}
