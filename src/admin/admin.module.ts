import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { StudentModule } from 'src/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerEntity } from 'src/common/entities/admin-entities/organizer.entity';
import { ClubEntity } from 'src/common/entities/admin-entities/club.entity';
import { AdminEntity } from 'src/common/entities/admin-entities/admin.entity';
import { AuthModule } from 'src/common/auth/admin-auth/auth.module';

@Module({
  imports: [
    StudentModule,
    AuthModule,
    TypeOrmModule.forFeature([OrganizerEntity,
      ClubEntity,
      AdminEntity])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
