import { Body, Controller, Delete, Get, Param , Patch, Post } from '@nestjs/common';

@Controller('student')
export class StudentController {


    @Post() // POST/student
    createStudent(@Body() studentInfo : object){
        return studentInfo ; 
    }

    @Get()   // GET/student
    getStudent() {
            return "Getting Student Info"
    }

    @Get('status') // GET/student/status
    getStudentStatus(){
        return "Getting student status"
    }

    @Get('notification') // GET/student/notification
    getNotificationSettings(){
        return "Getting Notificaton Settings"
    }


    @Patch(':id')  // PATCH/student/:id
    updateStudentName(@Param('id') id : string) { // maybe I have to use query parameters here , id and newname
        return  `updating user with id:  ${id}` ;
    }

    @Patch(':email')  // PATCH/student/:email
    updateStudenEmail(@Param('email') email : string){
            return email ;
    }

     @Patch('notification/:state') // PATCH/student/notification/:state
        updateNotificationSettings(@Param('state') notificationState : boolean){
        return notificationState; 
    }
     
    @Delete('saved/:eventid') // DELETE/student/saved/:eventId
    deleteSavedEvent(@Param('eventId') eventId: string){
        return `Deleting Event Id : ${eventId}`
    }





    
}
