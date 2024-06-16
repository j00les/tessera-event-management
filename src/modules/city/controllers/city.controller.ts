import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { City } from '../entities/city.entity';
import { CityService } from '../services/city.service';
import { CreateCityDto } from '../dto /create-city';

@ApiTags('Cities')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiResponse({ status: 200, description: 'City found', type: City })
  @ApiNotFoundResponse({ description: 'City not found' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<City> {
    const foundCity = await this.cityService.findById(id);

    if (!foundCity) {
      throw new NotFoundException('City not found');
    }

    return foundCity;
  }

  @ApiResponse({ status: 201, type: City })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @Post('create')
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.cityService.create(createCityDto);
  }
}
