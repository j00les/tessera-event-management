import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from '../entities/event.entity';
import { City } from '../../city/entities/city.entity';
import { CreateEventDto } from '../dto/create-event';
import { createEventDto, eventWithCity, mockCity } from '../../../fixtures/';
import { EventService } from './event.service';

describe('#EventService', () => {
  let service: EventService;
  let eventRepositoryMock: Partial<Repository<Event>>;
  let cityRepositoryMock: Partial<Repository<City>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(City),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    eventRepositoryMock = module.get(getRepositoryToken(Event));
    cityRepositoryMock = module.get(getRepositoryToken(City));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('event service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findAll', () => {
    it('should return all events with associated cities', async () => {
      const expectedResult = eventWithCity;

      (eventRepositoryMock.find as jest.Mock).mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(eventRepositoryMock.find).toHaveBeenCalledWith({
        relations: ['city'],
      });
    });

    it('should return an empty array if no events are found', async () => {
      (eventRepositoryMock.find as jest.Mock).mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(eventRepositoryMock.find).toHaveBeenCalledWith({
        relations: ['city'],
      });
    });

    it('should throw an error if repository find method throws an error', async () => {
      const error = new Error('error');

      (eventRepositoryMock.find as jest.Mock).mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrowError(error);
      expect(eventRepositoryMock.find).toHaveBeenCalledWith({
        relations: ['city'],
      });
    });
  });

  describe('#create', () => {
    it('should create a new event', async () => {
      (cityRepositoryMock.findOne as jest.Mock).mockResolvedValue(mockCity);
      (eventRepositoryMock.create as jest.Mock).mockReturnValue(createEventDto);
      (eventRepositoryMock.save as jest.Mock).mockResolvedValue(createEventDto);

      const result = await service.create(createEventDto);

      expect(result).toEqual(createEventDto);
      expect(cityRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: createEventDto.cityId },
      });
      expect(eventRepositoryMock.create).toHaveBeenCalledWith({
        eventName: createEventDto.eventName,
        city: mockCity,
        price: createEventDto.price,
      });
      expect(eventRepositoryMock.save).toHaveBeenCalledWith(createEventDto);
    });

    it('should throw NotFoundException if city is not found', async () => {
      const createEventDto: CreateEventDto = {
        eventName: 'New Event',
        cityId: 999,
        price: 200,
      };

      (cityRepositoryMock.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.create(createEventDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(cityRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: createEventDto.cityId },
      });
    });
  });

  describe('#findOne', () => {
    it('should find an event by id', async () => {
      const eventId = 1;
      const mockEvent: Event = {
        id: eventId,
        eventName: 'Event 1',
        city: null,
        price: 100,
      };

      (eventRepositoryMock.findOneBy as jest.Mock).mockResolvedValue(mockEvent);

      const result = await service.findOne(eventId);

      expect(result).toEqual(mockEvent);
    });
  });
});
