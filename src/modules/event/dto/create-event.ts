import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'we the fest',
    required: true,
  })
  eventName: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
    required: true,
  })
  cityId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 200000,
    required: true,
  })
  price: number;
}
