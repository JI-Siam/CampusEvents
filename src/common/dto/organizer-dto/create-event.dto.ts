import { IsString, MinLength, IsNotEmpty, IsInt } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventTitle: string;

  @IsString()
  @MinLength(5)
  eventDescription: string;

  @IsString()
  @IsNotEmpty()
  eventDate: string;

  @IsString()
  @IsNotEmpty()
  eventLocation: string;

  @IsInt()
  @IsNotEmpty()
  clubId: number;
}
