import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { EventEntity } from 'src/common/entities/organizer-entities/event.entity';

@Entity('clubs')
export class ClubEntity {
    @PrimaryGeneratedColumn()
    clubId: number;

    @Column()
    clubName: string;

    @Column()
    clubDescription: string;

    @Column()
    clubEstablishedYear: number;

    @Column()
    contactEmail: string;

    @ManyToOne(() => AdminEntity, admin => admin.clubs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'adminId' })
    admin: AdminEntity;

    @OneToMany(() => EventEntity, events => events.clubs)
    events: EventEntity[];

}
