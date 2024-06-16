import { CreateCityDto } from 'src/modules/city/dto /create-city';
import { City } from 'src/modules/city/entities/city.entity';
import { Event } from 'src/modules/event/entities/event.entity';

export const eventWithCity: Event[] = [
  {
    id: 1,
    eventName: 'DWP',
    price: 100,
    city: { id: 1, cityName: 'Jakarta', countryName: 'Indonesia' } as City,
  },
  {
    id: 2,
    price: 200,
    eventName: 'Reading Festival',
    city: { id: 2, cityName: 'Reading', countryName: 'England' } as City,
  },
];

export const createCityDto: CreateCityDto = {
  cityName: 'New York',
  countryName: 'US',
};

export const mockCity = {
  id: 1,
  cityName: 'Paris',
  countryName: 'France',
};
