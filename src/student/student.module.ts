import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student])] , 
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
