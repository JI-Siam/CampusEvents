import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events_table')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  location: string;
}
