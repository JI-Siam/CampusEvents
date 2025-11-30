import { ArgumentMetadata, Injectable, PipeTransform , BadRequestException } from '@nestjs/common';
import { error } from 'console';

@Injectable()
export class StudentValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
     if(typeof value !== 'object' || value == null){
       throw new BadRequestException ("Invalid Data !")
     }

     const errors : string[] =[]

     /*
      if (value.name !== undefined) {
        const studentNameRegex = /^[a-z A-Z]+$/
        value.name = value.name.trim()

        if(value.name.length < 3  || !studentNameRegex.test(value.name)){
            errors.push("Invalid Name - must contain Alphabets only and atleast 3 characters")
        }
      }
      */


      if (value.email !== undefined ) {
        value.email = value.email.trim()
        const id = value.email.split('@')[0]; 
        console.log(id) ; 
        if(!value.email.endsWith('@student.aiub.edu') || value.studentId !== id){
          errors.push(("Invalid Email - must be your_id@student.aiub.edu "))
        }
      }

      if (value.gender !== undefined) {
        let gender = value.gender.toUpperCase()
        gender = gender.trim()
        console.log(gender)
        if( gender !== 'MALE' && gender !== 'FEMALE'){
          errors.push("Invalid Gender - must enter 'Male' or 'Female' ")
        }
        value.gender=gender
      }


      if (value.department !== undefined) {
        value.department = value.department.toUpperCase().trim()
        const validDepartments : string[] =["CSE" , "BBA" , "EEE" , "IPE" , "LLB" ,"ENG"]
        console.log(value.department)
        if(!validDepartments.includes(value.department)){
          errors.push("Invalid Department - must enter CSE or BBA or EEE or IPE or LLB or ENG ")
        }

      }

      if (value.semester !== undefined) {
      }

      if (value.phoneNumber !== undefined) {
      }

      if (value.password !== undefined) {
      }
      console.log(errors.length)

      if(errors.length >=1 ){
        throw new BadRequestException({
          message: "Valadiation Failed !!"  , 
          errors
        })
      }

    return value;
  }
}
