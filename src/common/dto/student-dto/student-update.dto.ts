import { IsBoolean, IsNumber, IsOptional, IsString, Matches, Max, Min, MinLength } from "class-validator"

export class StudentUpdateDto{
    @IsOptional()
    @IsString()
    @MinLength(3)
    @Matches(/^[a-z A-Z]+$/)
     name? : string 


    @IsOptional() 
    @IsString() 
    gender?:string


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
    

    @IsOptional()
    @IsBoolean()
    notification?: boolean ;

    @IsOptional() 
    status?: string ; 
    
    @IsOptional()
    date?: number

}