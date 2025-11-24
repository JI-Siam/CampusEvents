import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { StudentController } from 'src/student/student.controller';
import { StudentService } from 'src/student/student.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [StudentModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
