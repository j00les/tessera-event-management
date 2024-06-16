import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CityController } from './city.controller';
import { CityService } from '../services/city.service';
import { createCityDto, mockCity } from '../../../fixtures';

jest.mock('../../city/entities/city.entity');
jest.mock('../../../swagger/events/events.schema');
jest.mock('../../../swagger/cities/cities.schema');

describe('#CityController', () => {
  let cityController: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const mockCityService = {
      findById: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: mockCityService,
        },
      ],
    }).compile();

    cityController = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should define CityController', () => {
    expect(cityController).toBeDefined();
  });

  describe('#findById', () => {
    it('should retrieve a city by id if found', async () => {
      const expectedResult = mockCity;

      (cityService.findById as jest.Mock).mockResolvedValue(expectedResult);

      const result = await cityController.findById(1);

      expect(result).toEqual(expectedResult);
      expect(cityService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if city is not found', async () => {
      (cityService.findById as jest.Mock).mockResolvedValue(null);

      await expect(cityController.findById(1)).rejects.toThrow(
        NotFoundException,
      );
      expect(cityService.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('#create', () => {
    it('should create a new city', async () => {
      const payload = createCityDto;
      const expectedResult = mockCity;

      (cityService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await cityController.create(payload);

      expect(result).toEqual(expectedResult);
      expect(cityService.create).toHaveBeenCalledWith(createCityDto);
    });
  });
});
