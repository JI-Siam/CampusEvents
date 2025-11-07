import { Body, Controller, Delete, Get, Param , Patch, Post, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentQueryDto } from './dto/student-query.dto';
import { StudentUpdateDto } from './dto/student-update.dto';
@Controller('students')
export class StudentController {
    constructor(private readonly studentService : StudentService){}

    @Post()
    createStudent(@Body() newStudent : CreateStudentDto){
       return this.studentService.createStudent(newStudent)
    }

    @Get()
    getAllStudents(){
       return this.studentService.getAllStudent()
    }

    @Get(':id')
    getStudent(@Param('id') studentId : string , @Query() query : StudentQueryDto){
        return this.studentService.getStudent(studentId , query) 
    }
    @Patch('update/:id')
    updateStudent(@Param('id') studentId: string , @Body() updatedInfo: StudentUpdateDto){
        return this.studentService.updateStudent(studentId , updatedInfo)
    }


}
