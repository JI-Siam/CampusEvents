import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizer } from '../entities/organizer-entities/organizer.entity';
import { Repository } from 'typeorm';
import { RegisterOrganizerDto } from '../dto/organizer-dto/register-organizer.dto';
import { LoginOrganizerDto } from '../dto/organizer-dto/login-organizer.dto';
import { BcryptHelper } from './bcrypt.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Organizer) private organizerRepo: Repository<Organizer>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterOrganizerDto) {
    const exists = await this.organizerRepo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await BcryptHelper.hashPassword(dto.password);

    const organizer = this.organizerRepo.create({
      email: dto.email,
      password: hashedPassword,
    });

    await this.organizerRepo.save(organizer);

    return { message: 'Organizer registered successfully' };
  }

  async login(dto: LoginOrganizerDto) {
    const organizer = await this.organizerRepo.findOne({
      where: { email: dto.email },
    });

    if (!organizer) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await BcryptHelper.comparePassword(
      dto.password,
      organizer.password,
    );

    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: organizer.id, email: organizer.email };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
    };
  }
}
