import { Body, Controller, Delete, Get, Param , Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from '../common/dto/student-dto/create-student.dto';
import { StudentQueryDto } from '../common/dto/student-dto/student-query.dto';
import { StudentUpdateDto } from 'src/common/dto/student-dto/student-update.dto';
import { StudentValidationPipe } from 'src/common/pipes/student-validation/student-validation.pipe';
import { StudentEntity } from '../common/entities/student-entities/student.entity';
import { StudentLoginDto } from 'src/common/dto/student-dto/student-login.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';
import { StudentUpdatePutDto } from 'src/common/dto/student-dto/student-update-put.dto';
@Controller('student')
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
    saveEvent(@Body('studentId') studentId : string , @Param('id') eventId : string){
        return this.studentService.saveEvent(studentId , eventId) ; 
    }

    @UseGuards(SupabaseAuthGuard)
    @Post('events/markjoining/:id') 
    joinEvent (@Body('studentId') studentId : string , @Param('id') eventId : string ){
      console.log("studetn Id " + studentId) ; 
      console.log("eventId " + eventId);
      return this.studentService.joinEvent(studentId , eventId) ; 
    }


    @UseGuards(SupabaseAuthGuard)
    @Post('club/markfavourite/:id') 
    markFavClub (@Param('id') studentId : string , @Query('clubId') clubId : string ){
      return this.studentService. markFavClub(studentId , clubId) ; 
    }

    // Backend route
    @Get('verify')
    @UseGuards(SupabaseAuthGuard)
    async verifyToken() {
      return {valid: true};
    }


    @UseGuards(SupabaseAuthGuard)
    @Get()
    getAllStudents(){
       return this.studentService.getAllStudent()
    }



    @Get('data')
    getData(){
      const info = {
        name : 'Jafir Islam Siam' , 
        id : '123' , 
        semester :'10'
      }
      return info; 
    }

     // @UseGuards(SupabaseAuthGuard)
     @Get('events')
   async getAllEvents(){
       // Inject the events service class here and then use this to get all the events. 
       // Events posted are in other modules. 
      return await this.studentService.getAllEvents()
    }

    @UseGuards(SupabaseAuthGuard)
    @Get('event/details/:id')
    async getEventDetails(@Param('id') eventId : any){
      return await this.studentService.getEventDetailsById(eventId) ; 
    }


        @Get('event/checkSaved/:eventId')
      @UseGuards(SupabaseAuthGuard)
      async checkSaved(
        @Param('eventId') eventId: string, 
        @Query('studentId') studentId: string
      ) {
        
        return this.studentService.checkEventSaved( studentId,  eventId);
      }

       @Get('event/checkJoined/:eventId')
      @UseGuards(SupabaseAuthGuard)
      async checkAlreadyJoined(
        @Param('eventId') eventId: string, 
        @Query('studentId') studentId: string
      ) {
        
        return this.studentService.checkAlreadyJoined( studentId,  eventId);
      }


      @UseGuards(SupabaseAuthGuard)
    @Get('events/saved')
    getAllSavedEvents(@Query('studentId') id : string){
        return this.studentService.getAllSavedEvents(id)
    }

      @UseGuards(SupabaseAuthGuard)
    @Get('events/joining') 
    getJoiningEvents (@Query('studentId') studentId : string ){
      return this.studentService.getJoiningEvents(studentId) ; 
    }

      @UseGuards(SupabaseAuthGuard)
    @Get(':id')
    getStudent(@Param('id') studentId : string , @Query() query : StudentQueryDto){
        return this.studentService.getStudent(studentId , query) 
    }

      @UseGuards(SupabaseAuthGuard)
    @Patch('update/:id') // patch or put ?? 
    async updateStudentInfo(@Param('id') studentId: string , @Body(new StudentValidationPipe()) updatedInfo: StudentUpdateDto){
       return await this.studentService.updateStudent(studentId , updatedInfo) ; 
    }


    @UseGuards(SupabaseAuthGuard)
    @Put('update/:id')
    replaceStudentInfo(@Param('id') id : string , @Body() studentInfo : StudentUpdatePutDto){
        return this.studentService.replaceStudentInfo(id , studentInfo );
    }

    // can a student delete himself? should this controller be here or in the admin module ? 

     @UseGuards(SupabaseAuthGuard)
    @Delete(':id')
    deleteStudent(@Param('id') id : string) {
        return this.studentService.deleteStudent(id) ;
    }


    @UseGuards(SupabaseAuthGuard)
    @Delete('events/saved/delete/:id')
     async removeSavedEvent(@Body('studentId') studentId : string , @Param('id') eventId : string){
       return await this.studentService.removeSavedEvent(studentId , eventId)
    }


}
