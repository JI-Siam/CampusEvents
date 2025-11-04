import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  private students: any[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      studentId: 'STU001',
      department: 'Computer Science',
      semester: 5,
      status: 'active',
      notificationEnabled: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      studentId: '22-50585-1',
      department: 'Business',
      semester: 3,
      status: 'active',
      notificationEnabled: false,
    },
  ];

  private savedEvents = [
    { id: '1', studentId: '1', eventId: 'EVT001' },
    { id: '2', studentId: '1', eventId: 'EVT002' },
  ];

  createStudent(createStudentDto: CreateStudentDto) {
    const newStudent = {
      id: String(this.students.length + 1),
      ...createStudentDto,
      status: 'active',
      notificationEnabled: true,
    };

    this.students.push(newStudent);

    return {
      message: 'Student created successfully',
      data: newStudent,
    };
  }

  getStudent() {
    return {
      message: 'Getting Student Info',
      data: this.students,
      total: this.students.length,
    };
  }

  getStudentStatus(id : string) {
   const student = this.students.find(s => s.id === id);
    return {
      message: 'Getting Student Status ',
      data: student.status,
    };
  }

  getNotificationSettings(id : string ) {

   const student = this.students.find(s => s.id === id);

    return {
      message: 'Getting Notification Settings',
      data: student.notificationEnabled,
    };
  }

  updateStudentName(id: string, name: string) {
    const student = this.students.find(s => s.id === id);

    if (!student) {
      return {
        statusCode: 404,
        message: `Student with id ${id} not found`,
      };
    }

    const oldName = student.name;
    student.name = name;

    return {
      message: `Updated student name from ${oldName} to ${name}`,
      data: student,
    };
  }

  updateStudentEmail(id: string, email: string) {
    const student = this.students.find(s => s.id === id);

    if (!student) {
      return {
        statusCode: 404,
        message: `Student with id ${id} not found`,
      };
    }

    const oldEmail = student.email;
    student.email = email;

    return {
      message: `Updated student email from ${oldEmail} to ${email}`,
      data: student,
    };
  }

  updateNotificationSettings(id: string, state: boolean) {
    const student = this.students.find(s => s.id === id);

    if (!student) {
      return {
        statusCode: 404,
        message: `Student with id ${id} not found`,
      };
    }

    student.notificationEnabled = state;

    return {
      message: `Notification settings updated to: ${state}`,
      data: {
        id: student.id,
        name: student.name,
        notificationEnabled: student.notificationEnabled,
      },
    };
  }

  deleteSavedEvent(eventId: string) {
    // deleting event 
  }

}
