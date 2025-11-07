import { IsOptional } from "class-validator"

export class StudentUpdateDto{
@IsOptional()
     name? : string 
    email? : string 
    gender?:string
    studentId?: string 
    department? : string 
    semester? : number 
    phoneNumber? : number 
    password? : string 
    notification?: boolean ; 
    status?: string ; 
    savedEvents?: string[] ; // here the id of the saved events will be stored
    date?: number

}