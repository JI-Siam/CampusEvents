import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Matches, Max, Min, MinLength } from "class-validator"

export class StudentUpdatePutDto{
 
    @IsString()
    @MinLength(3)
    @Matches(/^[a-z A-Z]+$/)
     name : string 

    @IsString() 
    gender:string

    @IsString()
    department: string

    @IsNumber()
    @Min(1)
    @Max(12)
    semester : number

    @IsString() 
    @Matches(/^01[0-9]{9}$/)
    phoneNumber : string
    

    @IsBoolean()
    notification: boolean ;
    
    @IsString()
    @IsIn(['active', 'inactive'])
    status: string;

}