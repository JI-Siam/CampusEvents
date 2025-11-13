import { IsNumber, IsOptional, IsString, Matches, Max, Min, MinLength } from "class-validator"

export class StudentUpdateDto{
    @IsOptional()
     name? : string 

     @IsOptional()
    email? : string

    @IsOptional() 
    gender?:string

    @IsOptional()
    studentId?: string

    @IsOptional() 
    department? : string

    @IsOptional() 
    semester? : number

    @IsOptional() 
    phoneNumber? : string

    @IsOptional() 
    password? : string

    @IsOptional() 
    notification?: boolean ;

    @IsOptional() 
    status?: string ; 

    @IsOptional()
    savedEvents?: string[] ; // here the id of the saved events will be stored
    
    @IsOptional()
    date?: number

}