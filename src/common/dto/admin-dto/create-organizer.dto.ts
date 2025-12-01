import { IsString, IsEmail, IsNotEmpty, IsDateString, MinLength, IsPhoneNumber, IsInt } from 'class-validator';

export class CreateOrganizerDto {
  @IsString()
  @IsNotEmpty()
  organizerName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string; 

  @IsDateString()
  @IsNotEmpty()
  dob: string;  
  
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string;
  
  @IsInt()
  @IsNotEmpty()
  adminId: number;
}

