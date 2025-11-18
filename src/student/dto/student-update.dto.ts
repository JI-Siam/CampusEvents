import { IsBoolean, IsNumber, IsOptional, IsString, Matches, Max, Min, MinLength } from "class-validator"

export class StudentUpdateDto{
    @IsOptional()
    @IsString()
    @MinLength(3)
    @Matches(/^[a-z A-Z]+$/)
     name? : string 

    @IsOptional()
    @IsString()
    email? : string 

    @IsOptional() 
        @IsString() 
    gender?:string

    @IsOptional()
        @IsString()
    @Matches(/^[0-1][0-9]|2[0-5]-[0-9]{5}-[1-3]$/)
    studentId?: string

    @IsOptional() 
        @IsString()
    department? : string

    @IsOptional() 
    @IsNumber()
    @Min(1)
    @Max(12)
    semester? : number

    @IsOptional() 
    @IsString() 
    @Matches(/^01[0-9]{9}$/)
    phoneNumber? : string
    
    @IsString() //  must be strong password , capital + number + special chars
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^ ]{8,}$/) // for strong 
    @MinLength(6)
    @IsOptional() 
    password? : string

    @IsOptional()
    @IsBoolean()
    notification?: boolean ;

    @IsOptional() 
    status?: string ; 

    @IsOptional()
    savedEvents?: string[] ; // here the id of the saved events will be stored
    
    @IsOptional()
    date?: number

}