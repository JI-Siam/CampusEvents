import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

@Injectable()
export class StudentService {
    private students = [
        { id: 1, name: "Sushanto", age: 25 },
        { id: 2, name: "Mitu", age: 24 },
        { id: 3, name: "Siam", age: 23 }
    ];

    getAllStudents() {
        return this.students;
    }

    getStudentById(id: number) {
        const student = this.students.find((s) => s.id === id);
        if (!student) {
            return "Studnet not found";
        }
        return student;
    }

    getStudentByName(name: string) {
        const student = this.students.find((s) => s.name == name);
        if (!student) {
            return "Student not found";
        }
        return student;
    }

    //POST
    createStudnet(data: { name: string; age: number }) {
        const newStudent = {
            id: Date.now(), //Date.now() Generates unique id
            ...data, //Spread Operator diye baki valu gula insert kora hoi....
        }
        this.students.push(newStudent); // array te value insert kora hoiche...
        return newStudent;
    }

    // PUT
    updateStudent(id: number, data: { name: string, age: number }) {
        const index = this.students.findIndex((s) => s.id === id);
        if (index === -1) throw new NotFoundException('Studnet not found!');
        this.students[index] = { id, ...data };
        return this.students[index];
    }

    //PATCH
    patchStudent(id: number, data: Partial<{ name: string; age: number }>) {
        const student = this.getStudentById(id);
        Object.assign(student, data);
        return student;
    }

    //Delete
    deleteStudent(id: number) {
        const index = this.students.findIndex((s) => s.id === id);
        if (index === - 1) throw new NotFoundException('Student not found!');
        const deleted = this.students.splice(index,1);
        return {message: 'Student Deleted', student: deleted[0]};
    }
}
