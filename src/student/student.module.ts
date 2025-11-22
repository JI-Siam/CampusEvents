import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../common/entities/student-entities/student.entity';
import { EventEntity } from 'src/common/entities/student-entities/event.entity';
import { EventSavedEntity } from 'src/common/entities/student-entities/eventSaved.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StudentEntity , EventEntity , EventSavedEntity])] , 
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
