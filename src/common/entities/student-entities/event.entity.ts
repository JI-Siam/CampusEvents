import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventSavedEntity } from "./eventSaved.entity";

@Entity('event')
export class EventEntity{

    @PrimaryGeneratedColumn()
    eventId : number 

    @Column()
    detail: string 

    @OneToMany(()=> EventSavedEntity , (eventSaved)=> eventSaved.event)
    eventsSaved : EventSavedEntity[]


}