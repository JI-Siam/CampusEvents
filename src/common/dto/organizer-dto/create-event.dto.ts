import { IsString, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsString()
  date: string;

  @IsString()
  location: string;
}
