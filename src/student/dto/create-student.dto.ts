import { IsEmail, IsEnum, IsNumber, IsString, Matches, Max, Min, MinLength, minLength } from "class-validator"

export class CreateStudentDto{
   
    @IsString()
    @MinLength(3)
    @Matches(/^[a-z A-Z]+$/)
    name : string  

     @IsString()
    email : string   //  custom validator - student.aiub.edu

    @IsString() 
    gender: string // custom check 

    @IsString()
    @Matches(/^[0-1][0-9]|2[0-5]-[0-9]{5}-[1-3]$/)
    studentId: string  

    @IsString()
    department : string  // only provided departments

    @IsNumber()
    @Min(1)
    @Max(12)
    semester : number   // must be btween 0 - 12

    @IsString() 
    @Matches(/^01[0-9]{9}$/)
    phoneNumber : string   //..only start with 01 and 11 numbers max 


    @IsString() //  must be strong password , capital + number + special chars
    // @Matches(/^(?=.*A-Z)(?=.*a-z)(?=.*\d)(?=.*^[A-Za-z0-9]){8,}$/) for strong 
    @MinLength(6)
    @Matches(/^.*[A-Z]+.*$/)
    password : string 
}