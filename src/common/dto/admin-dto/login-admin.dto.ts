import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
