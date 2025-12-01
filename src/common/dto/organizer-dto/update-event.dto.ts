import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  eventTitle?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  eventDescription?: string;

  @IsOptional()
  @IsString()
  eventDate?: string;

  @IsOptional()
  @IsString()
  eventLocation?: string;

}
