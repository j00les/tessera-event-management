import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @IsNotEmpty()
  @IsNumber()
  cityId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
