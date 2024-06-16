import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { City } from '../entities/city.entity';
import { CityService } from '../services/city.service';
import { CreateCityDto } from '../dto /create-city';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':id')
  async findById(@Param('id') id: number): Promise<City> {
    const foundCity = await this.cityService.findById(id);

    if (!foundCity) {
      throw new NotFoundException('City not found');
    }

    return foundCity;
  }

  @Post('create')
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.cityService.create(createCityDto);
  }
}
