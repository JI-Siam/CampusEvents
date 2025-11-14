import { Entity , PrimaryGeneratedColumn , Column, Unique, PrimaryColumn} from "typeorm";
@Entity()
export class Student{
    @Column()
    name : string 
    @Column({ unique: true })
     email : string
    @Column()
    gender:string
    @PrimaryColumn()
    studentId: string 
    @Column()
    department : string 
    @Column()
    semester : number
    @Column()
    phoneNumber : string
    @Column()
    password : string 
    @Column()
    notification: boolean 
    @Column()
    status : string 
    @Column({ type: 'timestamptz' })
    date: Date

}