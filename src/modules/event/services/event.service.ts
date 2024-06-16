import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from '../entities/event.entity';
import { City } from '../../city/entities/city.entity';
import { CreateEventDto } from '../dto/create-event';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['city'] });
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { eventName, cityId, price } = createEventDto;

    const foundCity = await this.cityRepository.findOne({
      where: { id: cityId },
    });

    if (!foundCity) {
      throw new NotFoundException('City not found');
    }

    const event = this.eventRepository.create({
      eventName,
      city: foundCity,
      price,
    });

    return this.eventRepository.save(event);
  }

  async findOne(id: number): Promise<Event> {
    return this.eventRepository.findOneBy({ id });
  }
}
