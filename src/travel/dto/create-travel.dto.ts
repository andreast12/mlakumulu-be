import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTravelDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  touristId: string;
}
