import { Entity , PrimaryGeneratedColumn , Column, Unique, PrimaryColumn} from "typeorm";
@Entity('student')
export class StudentEntity{

    @PrimaryGeneratedColumn({type: 'int' , unsigned:true})
    id : number

    @Column({type: 'varchar'  , length : 100})
    name : string 

    @Column({ unique: true })
     email : string
    @Column()
    gender:string
    @Column({unique: true})
    studentId: string 

    @Column()
    department : string 
    
    @Column({type:'int' , unsigned: true})
    semester : number
    @Column()
    phoneNumber : string
    @Column()
    password : string 
    @Column()
    notification: boolean 
    @Column({type : 'enum'  , enum : ['active' , 'inactive'] , default:'active'} )
    status : 'active' | 'inactive'
    @Column({ type: 'timestamptz' })
    date: Date

}