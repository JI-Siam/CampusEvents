import { Body, Controller, Delete, Get, Param , Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from 'src/common/dto/student-dto/create-student.dto';
import { StudentQueryDto } from 'src/common/dto/student-dto/student-query.dto';
import { StudentUpdateDto } from 'src/common/dto/student-dto/student-update.dto';
import { StudentValidationPipe } from 'src/common/pipes/student-validation/student-validation.pipe';
import { StudentService } from 'src/student/student.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly studentService : StudentService){}
    
        @Post()
        createStudent(@Body(new StudentValidationPipe()) newStudent : CreateStudentDto){
           return this.studentService.createStudent(newStudent)
        }
    
        @Post('events/save/:id') 
        saveEvent(@Param('id') id : string , @Query('eventId') eventId : string){
            return this.studentService.saveEvent(id , eventId)
        }
    
        @Get('students')
        getAllStudents(){
           return this.studentService.getAllStudent()
        }
    
         @Get('events')
       async getAllEvents(){    
          return await this.studentService.getAllEvents()
        }
    
          @Get('events/saved/:id')
        getAllSavedEvents(@Param('id') id : string){
            return this.studentService.getAllSavedEvents(id)
        }
    
      
        @Get(':id')
        getStudent(@Param('id') studentId : string , @Query() query : StudentQueryDto){
            return this.studentService.getStudent(studentId , query) 
        }
    
        @Patch('update/:id') // patch or put ?? 
        async updateStudentInfo(@Param('id') studentId: string , @Body(new StudentValidationPipe()) updatedInfo: StudentUpdateDto){
            return await this.studentService.updateStudent(studentId , updatedInfo)
        }
    
    
        @Put(':id')
        UpdateStudent(@Param('id') id : string , @Body() studentInfo : StudentUpdateDto){
            // update the student here - Using put in different case may be more natural. 
        }
    
        // can a student delete himself? should this controller be here or in the admin module ? 
    
        @Delete(':id')
        deleteStudent(@Param('id') id : string) {
            return this.studentService.deleteStudent(id) 
        }
}
