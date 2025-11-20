import { IsOptional, IsString } from 'class-validator';

export class StudentQueryDto{
   @IsOptional()
   @IsString()
   fields? : string  // ? makes it optional 
   // this is gonna take a query string 
   // fields:"the fields of the student here"
}