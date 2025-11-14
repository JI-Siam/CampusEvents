import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentQueryDto } from './dto/student-query.dto';
import{Student}  from './user.entity'

import { StudentUpdateDto } from './dto/student-update.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
   constructor(@InjectRepository(Student)private readonly studentRepository : Repository<Student>){}
   private students : Student [] =[
   ]

   async createStudent(studentData : Partial<Student>){
    const newStudent =   this.studentRepository.create(studentData)
      newStudent.notification = true 
      newStudent.status= "Active" 
      newStudent.date= new Date()
      await this.studentRepository.save(newStudent)
        return {
      message:"New Student Created Successfully" , 
      student : studentData , 
      name : studentData.name  , 
      studentId : studentData.studentId
    }
   }


    async getAllStudent(){
      return this.studentRepository.find()
   }

   async getStudentById(studentId: string){
     const student = await this.studentRepository.findOneBy({studentId}) ;
     if(!student){
      throw new NotFoundException("Student Not Found!!!")
     }
     return student
   }

   getSpecificStudentFields(query : StudentQueryDto , student : Student){
     if (!query.fields) return student; // If no specific fields required return all data 

       const fieldList = query.fields.split(',')
       const studentInfo : any = {}

       fieldList.forEach(f => {
        if(f in student){
          studentInfo[f] = student[f]
        }
       });

       return studentInfo
       }
   
   
       
   async getStudent(studentId: string  , query : StudentQueryDto){
    const student =await this.getStudentById(studentId) 
    return  this.getSpecificStudentFields(query ,student)
   }

   updateStudent(studentId : string , updatedStudentInfo : StudentUpdateDto){
    const student = this.getStudentById(studentId) 
    Object.assign(student,updatedStudentInfo)
    return student
   }

   deleteStudent(id : string){
     const student= this.getStudentById(id) 
     // delete the student here . 

   }

   /*
   saveEvent(id : string , eventId : string){
     const student = this.getStudentById(id) 
     student.savedEvents.push(eventId)
     return{
       savedEvents: student.savedEvents
     }
   }

   getAllSavedEvents(id : string){
      const student = this.getStudentById(id) 
      const {savedEvents} = student
      return{
        savedEvents : savedEvents
      }
   }  

   removeSavedEvent(id : string , eventId : string){
     const student = this.getStudentById(id)
     // logic here
   }    
     */
    
   }

 