import { ApiProperty } from '@nestjs/swagger';
import { CityResponse } from '../cities/cities.schema';

export class GetAllEventResponse {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the event',
  })
  id: number;

  @ApiProperty({ example: 'dwp', description: 'The name of the event' })
  eventName: string;

  @ApiProperty({ example: 20, description: 'The price of the event' })
  price: number;

  @ApiProperty({
    type: CityResponse,
    description: 'The city where the event is held',
  })
  city: CityResponse;
}

export class EventResponse {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'we the fest',
  })
  eventName: string;

  @ApiProperty({
    example: 50000,
  })
  price: number;
}
