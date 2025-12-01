import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../common/entities/student-entities/student.entity';
import { EventSavedEntity } from 'src/common/entities/student-entities/eventSaved.entity';
import { AuthModule } from 'src/auth/auth/auth.module';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { EventEntity } from 'src/common/entities/organizer-entities/event.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StudentEntity, EventEntity, EventSavedEntity]) , AuthModule , OrganizerModule] , 
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
