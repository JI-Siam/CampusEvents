import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { Event } from "../organizer-entities/event.entity";

@Entity('eventSaved')

export class EventSavedEntity{
    @PrimaryGeneratedColumn()
    savedId : number ; 

    // relations 
    @ManyToOne(()=>StudentEntity , (student) => student.eventsSaved)
    @JoinColumn({name : "studentId"})
    student : StudentEntity; 

    @ManyToOne(()=> Event , (event) => event.eventsSaved)
    @JoinColumn({name : "eventId"})
    event : Event;

    @CreateDateColumn()
    saved_at : Date
}