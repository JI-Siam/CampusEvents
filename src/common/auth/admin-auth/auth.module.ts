import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/common/entities/admin-entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: 'CampusEventsSecret2025',
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule { }
