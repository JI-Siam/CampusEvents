import { IsNotEmpty, Matches, MinLength, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z\s.]+$/, { message: 'Name must not contain any special character' })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[a-z]).*$/, { message: 'Password must contain at least one lowercase character' })
  password: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^01[0-9]{9}$/, { message: 'Phone number must start with 01 and contain 11 digits' })
  phone: string;

  file?: Express.Multer.File;
}
