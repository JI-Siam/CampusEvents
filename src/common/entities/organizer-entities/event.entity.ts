import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClubEntity } from 'src/common/entities/admin-entities/club.entity';

@Entity('events_table')
export class EventEntity {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column()
  eventTitle: string;

  @Column()
  eventDescription: string;

  @Column()
  eventDate: string;

  @Column()
  eventLocation: string;

  @ManyToOne(() => ClubEntity, club => club.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clubId' })
  clubs: ClubEntity;

  @Column()
  clubId: number;
}
