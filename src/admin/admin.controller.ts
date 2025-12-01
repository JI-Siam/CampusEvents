import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from 'src/common/dto/student-dto/create-student.dto';
import { StudentQueryDto } from 'src/common/dto/student-dto/student-query.dto';
import { StudentUpdateDto } from 'src/common/dto/student-dto/student-update.dto';
import { StudentValidationPipe } from 'src/common/pipes/student-validation/student-validation.pipe';
import { StudentService } from 'src/student/student.service';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/common/auth/jwt.guard';
import { CreateOrganizerDto } from 'src/common/dto/admin-dto/create-organizer.dto';
import { UpdateOrganizerDto } from 'src/common/dto/admin-dto/update-organizer.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
    constructor(private readonly studentService: StudentService, private adminService: AdminService) { }

    @Post('addStudent')
    createStudent(@Body(new StudentValidationPipe()) newStudent: CreateStudentDto) {
        return this.studentService.createStudent(newStudent)
    }

    @Get('students')
    getAllStudents() {
        return this.studentService.getAllStudent()
    }

    @Get('student/:id')
    getStudent(@Param('id') studentId: string, @Query() query: StudentQueryDto) {
        return this.studentService.getStudent(studentId, query)
    }

    @Patch('updateStudent/:id')
    async updateStudentInfo(@Param('id') studentId: string, @Body(new StudentValidationPipe()) updatedInfo: StudentUpdateDto) {
        return await this.studentService.updateStudent(studentId, updatedInfo)
    }

    @Put('updateStudent/:id')
    UpdateStudent(@Param('id') id: string, @Body() studentInfo: StudentUpdateDto) {
    }

    @Delete('deleteStudent:id')
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
        return this.adminService.findOneById(id);
    }

    @Get('organizer/phone/:phone')
    getByPhone(
        @Param('phone', new ValidationPipe({ transform: true })) phone: string
    ) {
        return this.adminService.findByPhone(phone);
    }

    @Post('addOrganizer')
    createOrganizer(
        @Body(new ValidationPipe({ whitelist: true })) body: CreateOrganizerDto
    ) {
        return this.adminService.createOrganizer(body);
    }

    @Patch('updateOrganizer/:id')
    updateOrganizerInfo(
        @Param('id') id: number,
        @Body(new ValidationPipe({ whitelist: true })) body: UpdateOrganizerDto,
    ) {
        return this.adminService.updateOrganizer(id, body);
    }

    @Put('updateOrganizer/:id')
    updateOrganizer(@Param('id') id: number, @Body() dto: UpdateOrganizerDto) {
        return this.adminService.updateOrganizer(id, dto);
    }

    @Delete('deleteOrganizer/:id')
    deleteOrganizer(@Param('id') id: number) {
        return this.adminService.removeOrganizer(id);
    }

    @Get('status')
    status() {
        return { message: 'Admin Module Running' };
    }

}
