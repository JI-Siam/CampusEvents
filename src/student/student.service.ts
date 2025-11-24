import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from '../common/dto/student-dto/create-student.dto';
import { StudentQueryDto } from '../common/dto/student-dto/student-query.dto';
import { StudentEntity } from '../common/entities/student-entities/student.entity'

import { StudentUpdateDto } from '../common/dto/student-dto/student-update.dto';
import { LessThan, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/common/entities/student-entities/event.entity';
import { EventSavedEntity } from 'src/common/entities/student-entities/eventSaved.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
  private readonly studentRepository: Repository<StudentEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(EventSavedEntity)
    private readonly eventSavedRepository: Repository<EventSavedEntity>
  ) { }

  private students: StudentEntity[] = []

  async createStudent(studentData: Partial<StudentEntity>) {
    const newStudent = this.studentRepository.create(studentData)
    await this.studentRepository.save(newStudent)
    return {
      message: "New Student Created Successfully",
      student: studentData,
      name: studentData.name,
      studentId: studentData.studentId
    }
  }


  async getAllStudent() {
    return this.studentRepository.find()
  }

  async getStudentById(studentId: string): Promise<StudentEntity> {
    const student = await this.studentRepository.findOneBy({ studentId });
    if (!student) {
      throw new NotFoundException("Student Not Found!!!")
    }
    return student
  }

  getSpecificStudentFields(query: StudentQueryDto, student: StudentEntity) {
    if (!query.fields) return student; // If no specific fields required return all data 

    const fieldList = query.fields.split(',')
    const studentInfo: any = {}

    fieldList.forEach(f => {
      if (f in student) {
        studentInfo[f] = student[f]
      }
    });

    return studentInfo
  }


  async getStudent(studentId: string, query: StudentQueryDto) {
    const student = await this.getStudentById(studentId)
    return this.getSpecificStudentFields(query, student)
  }


  async updateStudent(studentId: string, updatedStudentInfo: StudentUpdateDto): Promise<StudentEntity> {
    const student = await this.studentRepository.findOneBy({ studentId })
    const updatedStudent = { ...student }

    console.log("Found Student : ", student)
    console.log("Updated Initial Student : ", student)

    for (const key in updatedStudentInfo) {
      if (updatedStudentInfo[key] !== undefined) {
        updatedStudent[key] = updatedStudentInfo[key]
      }
    }

    console.log("Updated Student : ", updatedStudent)

    return this.studentRepository.save(updatedStudent)

  }



  deleteStudent(id: string) {
    const student = this.getStudentById(id)
    // delete the student here . 

  }

  async getAllEvents(): Promise<EventEntity[]> {
    const allEvents = await this.eventRepository.find()
    return allEvents;
  }

  async getEventById(id: number) {
    const event = await this.eventRepository.findOneBy({ eventId: id })
    if (!event) {
      throw new NotFoundException("No Event Found !!")
    }
    return event;
  }



  async saveEvent(id: string, eventId: string) {
    const newSavedEvent = new EventSavedEntity();
    newSavedEvent.student = await this.getStudentById(id)
    newSavedEvent.event = await this.getEventById(Number(eventId));
    return await this.eventSavedRepository.save(newSavedEvent);
  }


  async getAllSavedEvents(id: string) {
    const savedEvents = await this.eventSavedRepository.find(
      {
        where:
        {
          student: { studentId: id },
        },
        relations: ['event']
      }
    )

    if (!savedEvents) {
      throw new NotFoundException("No Saved Events Found");
    }

    return savedEvents;
  }


  /*
  async removeSavedEvent(id : string , eventId : string){
      const removeSavedEvent = await this.eventSavedRepository.delete({
       where:
       {
         student : {studentId : id}
       }, 
       {event : {eventId : Number(eventId)}} 
      })

      if(removeSavedEvent.affected ==0 ){
        throw new NotFoundException ("No Saved Events Found to Delete") ; 
      }

      return removeSavedEvent;
  }    
*/

}

