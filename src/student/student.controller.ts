import { Body, Controller, Delete, Get, Param , Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from '../common/dto/student-dto/create-student.dto';
import { StudentQueryDto } from '../common/dto/student-dto/student-query.dto';
import { StudentUpdateDto } from '../common/dto/student-dto/student-update.dto';
import { StudentValidationPipe } from 'src/common/pipes/student-validation/student-validation.pipe';
import { StudentEntity } from '../common/entities/student-entities/student.entity';
import { StudentLoginDto } from 'src/common/dto/student-dto/student-login.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';
@Controller('students')
export class StudentController {
    constructor(private readonly studentService : StudentService){}

    @Post('signup')
    signUpStudent(@Body(new StudentValidationPipe()) newStudent : CreateStudentDto){
       return this.studentService.createStudent(newStudent)
    }

    @Post('login') 
    loginStudent(@Body() studentLoginDto : StudentLoginDto){
        return this.studentService.loginStudent(studentLoginDto) ; 
    }
 

    @UseGuards(SupabaseAuthGuard)
    @Post('events/save/:id') 
    saveEvent(@Param('id') id : string , @Query('eventId') eventId : string){
        return this.studentService.saveEvent(id , eventId)
    }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    getAllStudents(){
       return this.studentService.getAllStudent()
    }

      @UseGuards(SupabaseAuthGuard)
     @Get('events')
   async getAllEvents(){
       // Inject the events service class here and then use this to get all the events. 
       // Events posted are in other modules. 
      return await this.studentService.getAllEvents()
    }

      @UseGuards(SupabaseAuthGuard)
    @Get('events/saved/:id')
    getAllSavedEvents(@Param('id') id : string){
        return this.studentService.getAllSavedEvents(id)
    }

  
      @UseGuards(SupabaseAuthGuard)
    @Get(':id')
    getStudent(@Param('id') studentId : string , @Query() query : StudentQueryDto){
        return this.studentService.getStudent(studentId , query) 
    }

      @UseGuards(SupabaseAuthGuard)
    @Patch('update/:id') // patch or put ?? 
    async updateStudentInfo(@Param('id') studentId: string , @Body(new StudentValidationPipe()) updatedInfo: StudentUpdateDto){
        return await this.studentService.updateStudent(studentId , updatedInfo)
    }


      @UseGuards(SupabaseAuthGuard)
    @Put(':id')
    UpdateStudent(@Param('id') id : string , @Body() studentInfo : StudentUpdateDto){
        // update the student here - Using put in different case may be more natural. 
    }

    // can a student delete himself? should this controller be here or in the admin module ? 

     @UseGuards(SupabaseAuthGuard)
    @Delete(':id')
    deleteStudent(@Param('id') id : string) {
        return this.studentService.deleteStudent(id) 
    }


    @UseGuards(SupabaseAuthGuard)
    @Delete('events/saved/delete/:id')
     async removeSavedEvent(@Param('id') id : string , @Query('eventId') eventId : string){
       return await this.studentService.removeSavedEvent(id , eventId)
    }


}
