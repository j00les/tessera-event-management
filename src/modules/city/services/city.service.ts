import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from 'src/modules/city/entities/city.entity';
import { CreateCityDto } from '../dto /create-city';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async findById(id: number): Promise<City> {
    return this.cityRepository.findOneBy({ id });
  }

  async create(createCityDto: CreateCityDto): Promise<City> {
    const { cityName, countryName } = createCityDto;

    const city = this.cityRepository.create({ cityName, countryName });

    return this.cityRepository.save(city);
  }
}
