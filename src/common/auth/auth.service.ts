import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizerEntity } from 'src/common/entities/admin-entities/organizer.entity';
import { Repository } from 'typeorm';
import { RegisterOrganizerDto } from '../dto/organizer-dto/register-organizer.dto';
import { LoginOrganizerDto } from '../dto/organizer-dto/login-organizer.dto';
import { BcryptHelper } from './bcrypt.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OrganizerEntity) private organizerRepo: Repository<OrganizerEntity>,
    private jwtService: JwtService,
  ) { }

  async register(dto: RegisterOrganizerDto) {
    const exists = await this.organizerRepo.findOne({ where: { organizerEmail: dto.email } });
    if (exists) {
      throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await BcryptHelper.hashPassword(dto.password);

    // const organizer = this.organizerRepo.create({
    //   organizerEmail: dto.email,
    //   organizerPassword: hashedPassword,
    // });

    const organizer = this.organizerRepo.create({
      organizerName: dto.organizerName,
      organizerEmail: dto.email,
      organizerPhone: dto.phone,
      organizerDob: dto.dob,
      organizerPassword: hashedPassword,
      admin: { adminId: dto.adminId },
    });


    await this.organizerRepo.save(organizer);

    return { message: 'Organizer registered successfully' };
  }

  async login(dto: LoginOrganizerDto) {
    const organizer = await this.organizerRepo.findOne({
      where: { organizerEmail: dto.email },
    });

    if (!organizer) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await BcryptHelper.comparePassword(
      dto.password,
      organizer.organizerPassword,
    );

    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: organizer.organizerId, email: organizer.organizerEmail };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
    };
  }
}
