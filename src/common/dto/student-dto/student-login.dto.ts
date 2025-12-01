import { IsEmail, IsString, Matches, MinLength } from "class-validator"

export class StudentLoginDto{
    
    
    @IsEmail()
    email : string  // custom validator 

    @IsString() //  must be strong password , capital + number + special chars
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^ ]{8,}$/) // for strong 
    @MinLength(6)
    password : any
}