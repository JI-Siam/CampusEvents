import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateOrganizerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(11, 11)
  @IsOptional()
  phone?: string;
}
