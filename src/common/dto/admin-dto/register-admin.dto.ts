import { IsString, IsEmail, IsNotEmpty, IsDateString, MinLength, IsPhoneNumber, IsInt } from 'class-validator';

export class RegisterAdminDto {
  @IsString()
  @IsNotEmpty()
  adminName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

@IsString()
  @IsNotEmpty()
  gender: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsDateString()
  @IsNotEmpty()
  joiningDate: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string;
}
