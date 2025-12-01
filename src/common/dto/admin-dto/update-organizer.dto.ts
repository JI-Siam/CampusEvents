import { IsString, IsEmail, IsOptional, IsDateString, MinLength, IsPhoneNumber, IsInt } from 'class-validator';

export class UpdateOrganizerDto {
  
  @IsString()
  @IsOptional()
  organizerName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsDateString()
  @IsOptional()
  dob?: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  password?: string;

  // @IsInt()
  // @IsOptional()
  // adminId?: number;
}
