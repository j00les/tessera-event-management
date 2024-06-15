import { Test, TestingModule } from '@nestjs/testing';

import { eventWithCity } from '../../../fixtures/';
import { EventController } from './event.controller';
import { EventService } from '../services/event.service';
import { Event } from '../entities/event.entity';

describe('#EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    eventController = moduleRef.get<EventController>(EventController);
    eventService = moduleRef.get<EventService>(EventService);
  });

  it('should define eventController', () => {
    expect(eventController).toBeDefined();
  });

  describe('#findAll', () => {
    it('should return an array of events with respected associated cities', async () => {
      const expectedEvents = eventWithCity;
      jest.spyOn(eventService, 'findAll').mockResolvedValue(expectedEvents);

      const result = await eventController.findAll();

      expect(result).toEqual(expectedEvents);
      expect(eventService.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no events are found', async () => {
      const expectedEvents: Event[] = [];
      jest.spyOn(eventService, 'findAll').mockResolvedValue(expectedEvents);

      const result = await eventController.findAll();

      expect(result).toEqual(expectedEvents);
      expect(eventService.findAll).toHaveBeenCalled();
    });

    it('should throw errors', async () => {
      const error = new Error('Something went wrong');
      jest.spyOn(eventService, 'findAll').mockRejectedValue(error);

      await expect(eventController.findAll()).rejects.toThrow(error);
      expect(eventService.findAll).toHaveBeenCalled();
    });
  });
});
