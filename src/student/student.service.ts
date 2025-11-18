import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentQueryDto } from './dto/student-query.dto';
import{StudentEntity}  from './student.entity'

import { StudentUpdateDto } from './dto/student-update.dto';
import { LessThan, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
   constructor(@InjectRepository(StudentEntity)private readonly studentRepository : Repository<StudentEntity>){}
   private students : StudentEntity [] =[
   ]

   async createStudent(studentData : Partial<StudentEntity>){
    const newStudent =   this.studentRepository.create(studentData)
      newStudent.notification = true 
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

   async getStudentById(studentId: string): Promise<StudentEntity>{
     const student = await this.studentRepository.findOneBy({studentId}) ;
     if(!student){
      throw new NotFoundException("Student Not Found!!!")
     }
     return student
   }

   getSpecificStudentFields(query : StudentQueryDto , student : StudentEntity){
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

  async updateStudent(studentId : string , updatedStudentInfo :StudentUpdateDto): Promise<StudentEntity>{
     const student = await this.studentRepository.findOneBy({studentId})
    const updatedStudent ={...student} 

    console.log("Found Student : " , student)
    console.log("Updated Initial Student : " , student)

    for(const key in updatedStudentInfo){
      if(updatedStudentInfo[key] !== undefined){
         updatedStudent[key] = updatedStudentInfo[key] 
      }
    }

    console.log("Updated Student : " , updatedStudent)

    return this.studentRepository.save(updatedStudent)

   }

   async getInactiveStudents() : Promise<StudentEntity[]>{
    console.log("function running\n")
    const result = await this.studentRepository.find(
      {
      where:{
          status : "inactive"
       }
   })
   console.log(result) ; 

    if(!result){
      throw new NotFoundException("No Inactive Student Found")
    }

    return  result ; 

   }

   async getStudentBySemester(){
        const result = await this.studentRepository.find({
          where:{
            semester: LessThan(8)
          },
          select: {
            studentId : true ,
            name : true 
          }
        })

    if(!result){
      throw new NotFoundException("No Student with More than {8} semester Found")
    }   


    return result  ; 

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

 