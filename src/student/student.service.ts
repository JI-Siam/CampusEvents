import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentQueryDto } from './dto/student-query.dto';
import{Student}  from './interfaces/student-interface'
import { StudentUpdateDto } from './dto/student-update.dto';

@Injectable()
export class StudentService {
   private students : Student [] =[
    {
    name: "Jafir Islam Siam"  , 
    email : "siam@example.com" , 
    gender:"Male",
    studentId: "505741" , 
    department : "CSE" ,  
    semester: 8 , 
    phoneNumber : "669" , 
    password: "1234" , 
    notification: true , 
    status : "Active",
    savedEvents:[],
    date:Date.now()
 } , 
   ]

   createStudent(createStudentDto : CreateStudentDto){
    const newStudent : Student ={
      ...createStudentDto, 
      notification : true , 
      status: "Active" , 
      savedEvents:[],
      date: Date.now(),
    } 
    this.students.push(newStudent) ; 
    const {name , studentId} = newStudent
    return {
      message:"New Student Created Successfully" , 
      student : newStudent , 
      name : name  , 
      studentId : studentId
    }
   }

   getAllStudent(){
    return this.students 
   }

   getStudentById(studentId: string){
     const student = this.students.find((s) => s.studentId === studentId)
     if(!student) throw new NotFoundException("Student Not Found!!") 
      return student
   }

   getSpecificStudentFields(query : StudentQueryDto , student : Student){
     if (!query.fields) return student;

       const fieldList = query.fields.split(',')
       const studentInfo : any = {}

       fieldList.forEach(f => {
        if(f in student){
          studentInfo[f] = student[f]
        }
       });

       return studentInfo
       }
   
   
   getStudent(studentId: string  , query : StudentQueryDto){
    const student = this.getStudentById(studentId) 
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
    
   }

