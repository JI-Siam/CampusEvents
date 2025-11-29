import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterOrganizerDto } from '../dto/organizer-dto/register-organizer.dto';
import { LoginOrganizerDto } from '../dto/organizer-dto/login-organizer.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterOrganizerDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginOrganizerDto) {
    return this.authService.login(dto);
  }
}
