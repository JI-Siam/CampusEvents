import { IsEmail, IsNumber, IsString, Matches } from "class-validator"
import { StudentNamePipe } from "src/common/pipes/student.name/student.name.pipe"

export class CreateStudentDto{

    @IsString() // use custom validator - only alphabets
    @StudentNamePipe()
    name : string
    @IsEmail()  // use custom validator - .aiub.edu
    email : string  
    @IsString() // use custom validator - only male , female and other
    gender: string
    @IsString()
    studentId: string  // use custom validator. - only student id Pattern
    @IsString()
    department : string  // only provided departments
    @IsNumber() // must be btween 0 - 12
    semester : number  
    @IsNumber() //..only start with 01 and 11 numbers max 
    phoneNumber : number   
    @IsString() //  must be strong password , capital + number + special chars
    password : string 
}