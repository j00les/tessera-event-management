import { ApiProperty } from '@nestjs/swagger';

export class CityResponse {
  @ApiProperty({ example: 1, description: 'The unique identifier of the city' })
  id: number;

  @ApiProperty({ example: 'jakarta', description: 'The name of the city' })
  cityName: string;

  @ApiProperty({ example: 'indonesia', description: 'The name of the country' })
  countryName: string;
}
