import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { eventWithCity } from '../../../fixtures/';
import { EventController } from './event.controller';
import { EventService } from '../services/event.service';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from '../dto/create-event';

jest.mock('../../city/entities/city.entity');

describe('#EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const mockEventService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: mockEventService,
        },
      ],
    }).compile();

    eventController = moduleRef.get<EventController>(EventController);
    eventService = moduleRef.get<EventService>(EventService);
  });

  it('should define EventController', () => {
    expect(eventController).toBeDefined();
  });

  describe('#findAll', () => {
    it('should return an array of events with respected associated cities', async () => {
      const expectedEvents = eventWithCity;
      (eventService.findAll as jest.Mock).mockResolvedValue(expectedEvents);

      const result = await eventController.findAll();

      expect(result).toEqual(expectedEvents);
      expect(eventService.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no events are found', async () => {
      const expectedEvents: Event[] = [];
      (eventService.findAll as jest.Mock).mockResolvedValue(expectedEvents);

      const result = await eventController.findAll();

      expect(result).toEqual(expectedEvents);
      expect(eventService.findAll).toHaveBeenCalled();
    });

    it('should throw errors', async () => {
      const error = new Error('Something went wrong');
      (eventService.findAll as jest.Mock).mockRejectedValue(error);

      await expect(eventController.findAll()).rejects.toThrow(error);
      expect(eventService.findAll).toHaveBeenCalled();
    });
  });

  describe('#findById', () => {
    it('should retrieve an event by id if found', async () => {
      const mockEvent = eventWithCity[0];
      (eventService.findOne as jest.Mock).mockResolvedValue(mockEvent);

      const result = await eventController.findById(1);

      expect(result).toEqual(mockEvent);
      expect(eventService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if event is not found', async () => {
      (eventService.findOne as jest.Mock).mockResolvedValue(null);

      await expect(eventController.findById(1)).rejects.toThrow(
        NotFoundException,
      );

      expect(eventService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw errors', async () => {
      const error = new Error('Something went wrong');
      (eventService.findOne as jest.Mock).mockRejectedValue(error);

      await expect(eventController.findById(1)).rejects.toThrow(error);
      expect(eventService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('#create', () => {
    it('should create a new event given the correct body', async () => {
      const createEventDto: CreateEventDto = {
        eventName: 'New Event',
        cityId: 1,
        price: 100,
      };
      const mockEvent = eventWithCity[0];

      (eventService.create as jest.Mock).mockResolvedValue(mockEvent);

      const result = await eventController.create(createEventDto);

      expect(result).toEqual(mockEvent);
      expect(eventService.create).toHaveBeenCalledWith(createEventDto);
    });

    it('should throw NotFoundException if city is not found', async () => {
      const createEventDto: CreateEventDto = {
        eventName: 'New Event',
        cityId: 99,
        price: 100,
      };

      const error = new NotFoundException('City not found');
      (eventService.create as jest.Mock).mockRejectedValue(error);

      await expect(eventController.create(createEventDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(eventService.create).toHaveBeenCalledWith(createEventDto);
    });

    it('should handle unexpected errors', async () => {
      const createEventDto: CreateEventDto = {
        eventName: 'New Event',
        cityId: 1,
        price: 100,
      };

      const error = new Error('Unexpected error');
      (eventService.create as jest.Mock).mockRejectedValue(error);

      await expect(eventController.create(createEventDto)).rejects.toThrow(
        error,
      );
      expect(eventService.create).toHaveBeenCalledWith(createEventDto);
    });
  });
});
