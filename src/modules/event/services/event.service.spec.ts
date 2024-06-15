import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventService } from './event.service';
import { eventWithCity } from '../../../fixtures/';

describe('EventService', () => {
  let service: EventService;
  let repository: Repository<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should define eventService', () => {
    expect(service).toBeDefined();
  });

  describe('#findAll', () => {
    it('should return an array of events with their associated cities', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(eventWithCity);

      expect(repository.find).toHaveBeenCalledWith({ relations: ['city'] });
    });

    it('should return an empty array if no events are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledWith({ relations: ['city'] });
    });

    it('should throw an error if repository find method throws an error', async () => {
      const error = new Error('Test error');
      jest.spyOn(repository, 'find').mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrowError(error);
      expect(repository.find).toHaveBeenCalledWith({ relations: ['city'] });
    });
  });
});
