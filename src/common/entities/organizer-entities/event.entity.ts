import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EventSavedEntity } from '../student-entities/eventSaved.entity';

@Entity('events_table')
export class Event {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  location: string;

   @OneToMany(()=> EventSavedEntity , (eventSaved)=> eventSaved.event)
    eventsSaved : EventSavedEntity[]


}
