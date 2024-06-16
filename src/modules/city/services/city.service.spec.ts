import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CityService } from './city.service';
import { City } from '../entities/city.entity';
import { CreateCityDto } from '../dto /create-city';

describe('#CityService', () => {
  let cityService: CityService;
  let cityRepository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(City),
          useValue: {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    cityService = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('CityService should be defined', () => {
    expect(cityService).toBeDefined();
  });

  describe('#findById', () => {
    it('should find a city by id', async () => {
      const mockCity = {
        id: 1,
        cityName: 'Test City',
        countryName: 'Test Country',
      } as City;
      (cityRepository.findOneBy as jest.Mock).mockResolvedValue(mockCity);

      const result = await cityService.findById(1);

      expect(result).toEqual(mockCity);
      expect(cityRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should handle cityRepository errors', async () => {
      const error = new Error('Test error');
      (cityRepository.findOneBy as jest.Mock).mockRejectedValue(error);

      await expect(cityService.findById(1)).rejects.toThrow(error);
      expect(cityRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('#create', () => {
    it('should create a new city', async () => {
      const createCityDto: CreateCityDto = {
        cityName: 'New City',
        countryName: 'New Country',
      };
      const mockCity = { id: 1, ...createCityDto } as City;

      (cityRepository.create as jest.Mock).mockReturnValue(mockCity);
      (cityRepository.save as jest.Mock).mockResolvedValue(mockCity);

      const result = await cityService.create(createCityDto);

      expect(result).toEqual(mockCity);
      expect(cityRepository.create).toHaveBeenCalledWith(createCityDto);
      expect(cityRepository.save).toHaveBeenCalledWith(mockCity);
    });

    it('should handle cityRepository errors during creation', async () => {
      const createCityDto: CreateCityDto = {
        cityName: 'New City',
        countryName: 'New Country',
      };
      const error = new Error('Test error');

      (cityRepository.create as jest.Mock).mockReturnValue(createCityDto);
      (cityRepository.save as jest.Mock).mockRejectedValue(error);

      await expect(cityService.create(createCityDto)).rejects.toThrow(error);
      expect(cityRepository.create).toHaveBeenCalledWith(createCityDto);
      expect(cityRepository.save).toHaveBeenCalledWith(createCityDto);
    });
  });
});
