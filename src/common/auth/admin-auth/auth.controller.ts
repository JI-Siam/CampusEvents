import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from '../../dto/admin-dto/register-admin.dto';
import { LoginAdminDto } from '../../dto/admin-dto/login-admin.dto';

@Controller('authAdmin')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterAdminDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginAdminDto) {
    return this.authService.login(dto);
  }
}