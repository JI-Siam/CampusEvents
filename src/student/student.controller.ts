import { Body, Controller, Delete, Get, Param , Patch, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post() // POST/student
    createStudent(@Body() studentInfo: CreateStudentDto){
        return this.studentService.createStudent(studentInfo);
    }

    @Get()   // GET/student
    getStudent() {
        return this.studentService.getStudent();
    }
    // Can get student by ID

    @Get('status/:id') // GET/student/status
    getStudentStatus(@Param('id') id : string ){
        return this.studentService.getStudentStatus(id);
    }
    // Here can apply update status as well. 

    @Get('notification/:id') // GET/student/notification
    getNotificationSettings(@Param('id') id : string){
        return this.studentService.getNotificationSettings(id);
    }

    @Patch('name') // PATCH/student/name?id=1&name=NewName
    updateStudentName(@Query('id') id: string, @Query('name') name: string) {
        return this.studentService.updateStudentName(id, name);
    }

    @Patch('email') // PATCH/student/email?id=1&email=new@example.com
    updateStudenEmail(@Query('id') id: string, @Query('email') email: string){
        return this.studentService.updateStudentEmail(id, email);
    }

     @Patch('notification') // PATCH/student/notification?id=1&state=true
        updateNotificationSettings(@Query('id') id: string, @Query('state') state: string){
        return this.studentService.updateNotificationSettings(id, state === 'true');
    }
     
    @Delete('saved/:eventid') // DELETE/student/saved/:eventId
    deleteSavedEvent(@Param('eventId') eventId: string){
        return this.studentService.deleteSavedEvent(eventId);
    }

  // add events as well



    
}
