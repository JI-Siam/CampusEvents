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
    updateStudentInfo(@Param('id') studentId: string , @Body() updatedInfo: StudentUpdateDto){
        return this.studentService.updateStudent(studentId , updatedInfo)
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

    @Get('events')
    getAllEvents(){
       // Inject the events service class here and then use this to get all the events. 
       // Events posted are in other modules. 
    }

    @Post('events/save/:id') 
    saveEvent(@Param('id') id : string , @Query('eventId') eventId : string){
        this.studentService.saveEvent(id , eventId)
    }

    @Get('events/saved/:id')
    getAllSavedEvents(@Param('id') id : string){
        return this.studentService.getAllSavedEvents(id)
    }

    @Delete('events/saved/delete/:id')
    removeSavedEvent(@Param('id') id : string , @Query('eventId') eventId : string){
        this.studentService.removeSavedEvent(id , eventId)
    }








}
