import { Entity , PrimaryGeneratedColumn , Column, Unique, PrimaryColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { EventSavedEntity } from "./eventSaved.entity";
import { EventEntity } from "../organizer-entities/event.entity";
@Entity('student')
export class StudentEntity{


    @Column({type: 'varchar'  , length : 100})
    name : string 

    @Column({ unique: true })
     email : string

    @Column()
    gender:string

    @PrimaryColumn({unique: true})
    studentId: string 

    @Column()
    department : string 
    
    @Column({type:'int' , unsigned: true})
    semester : number

    @Column()
    phoneNumber : string

    @Column()
    password : string 

    @Column({default:true})
    notification: boolean

    @Column({type : 'enum'  , enum : ['active' , 'inactive'] , default:'active'} )
    status : 'active' | 'inactive'

    @OneToMany(()=> EventSavedEntity, (eventsSaved) => eventsSaved.student )
    eventsSaved : EventSavedEntity[]
    
    @CreateDateColumn()
    created_at:  Date

    @ManyToMany(()=> EventEntity , (event) => event.students)
    @JoinTable({name : 'student_event_join'})
    events : EventEntity[] ; 

}