import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { EventSavedEntity } from '../student-entities/eventSaved.entity';
import { StudentEntity } from '../student-entities/student.entity';

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

  @ManyToMany(()=> StudentEntity , (student) => student.events)
  @JoinColumn()
      students: StudentEntity[];

}
