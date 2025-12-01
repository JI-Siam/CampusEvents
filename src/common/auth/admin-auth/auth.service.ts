import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/common/entities/admin-entities/admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterAdminDto } from 'src/common/dto/admin-dto/register-admin.dto';
import { BcryptHelper } from '../bcrypt.helper';
import { LoginAdminDto } from 'src/common/dto/admin-dto/login-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    private jwtService: JwtService,
  ) { }

  async register(dto: RegisterAdminDto) {
    const exists = await this.adminRepo.findOne({ where: { adminEmail: dto.email } });
    if (exists) {
      throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await BcryptHelper.hashPassword(dto.password);

      const admin = this.adminRepo.create({
        adminName: dto.adminName,
        adminEmail: dto.email,
        adminPhone: dto.phone,
        adminGender: dto.gender,
        adminDob: dto.dob,
        adminJoiningDate: dto.joiningDate,
        adminPassword: hashedPassword,
      });

    await this.adminRepo.save(admin);

    return { message: 'Admin registered successfully' };
  }

  async login(dto: LoginAdminDto) {
    const admin = await this.adminRepo.findOne({
      where: { adminEmail: dto.email },
    });

    if (!admin) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await BcryptHelper.comparePassword(
      dto.password,
      admin.adminPassword,
    );

    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: admin.adminId, email: admin.adminEmail };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
    };
  }
}
