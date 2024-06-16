import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Jakarta',
    required: true,
  })
  cityName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Indonesia',
    required: true,
  })
  countryName: string;
}
