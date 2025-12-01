import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from 'src/common/dto/student-dto/create-student.dto';
import { StudentQueryDto } from 'src/common/dto/student-dto/student-query.dto';
import { StudentUpdateDto } from 'src/common/dto/student-dto/student-update.dto';
import { StudentValidationPipe } from 'src/common/pipes/student-validation/student-validation.pipe';
import { StudentService } from 'src/student/student.service';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly studentService: StudentService, private adminService: AdminService) { }

    @Post()
    createStudent(@Body(new StudentValidationPipe()) newStudent: CreateStudentDto) {
        return this.studentService.createStudent(newStudent)
    }

    @Post('events/save/:id')
    saveEvent(@Param('id') id: string, @Query('eventId') eventId: string) {
        return this.studentService.saveEvent(id, eventId)
    }

    @Get('students')
    getAllStudents() {
        return this.studentService.getAllStudent()
    }

    @Get('events')
    async getAllEvents() {
        return await this.studentService.getAllEvents()
    }

    @Get('events/saved/:id')
    getAllSavedEvents(@Param('id') id: string) {
        return this.studentService.getAllSavedEvents(id)
    }

    @Get(':id')
    getStudent(@Param('id') studentId: string, @Query() query: StudentQueryDto) {
        return this.studentService.getStudent(studentId, query)
    }

    @Patch('update/:id')
    async updateStudentInfo(@Param('id') studentId: string, @Body(new StudentValidationPipe()) updatedInfo: StudentUpdateDto) {
        return await this.studentService.updateStudent(studentId, updatedInfo)
    }

    @Put(':id')
    UpdateStudent(@Param('id') id: string, @Body() studentInfo: StudentUpdateDto) {
    }

    @Delete(':id')
    deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id)
    }

    // CRUD on Organizer

    @Get('organizers')
    getAll() {
        return this.adminService.findAll();
    }

    @Get('organizer/:id')
    getOrganizer(@Param('id') id: number) {
        return this.adminService.findOne(id);
    }

    @Get('organizer/phone/:phone')
    getByPhone(
        @Param('phone', new ValidationPipe({ transform: true })) phone: string
    ) {
        return this.adminService.findByPhone(phone);
    }

    // @Post('organizer')
    // createOrganizer(
    //     @Body(new ValidationPipe({ whitelist: true })) body: CreateOrganizerDto
    // ) {
    //     return this.organizerService.create(body);
    // }

    // @Patch('organizer/:id')
    // updateOrganizer(
    //     @Param('id') id: number,
    //     @Body(new ValidationPipe({ whitelist: true })) body: UpdateOrganizerDto,
    // ) {
    //     return this.organizerService.update(id, body);
    // }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.adminService.remove(id);
    }

}
