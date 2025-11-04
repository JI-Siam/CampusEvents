export class CreateStudentDto {
  name: string;
  email: string;
  studentId: string;
  department?: string;
  semester?: number;
}
