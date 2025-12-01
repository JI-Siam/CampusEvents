import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrganizerEntity } from 'src/common/entities/admin-entities/organizer.entity';
import { ClubEntity } from 'src/common/entities/admin-entities/club.entity';

@Entity('admin')
export class AdminEntity {
    @PrimaryGeneratedColumn()
    adminId: number;

    @Column()
    adminName: string;

    @Column({ unique: true })
    adminPhone: string;

    @Column({ unique: true })
    adminEmail: string;

    @Column()
    adminGender: string;

    @Column({ type: 'date' })
    adminDob: Date;

    @Column({ type: 'date' })
    adminJoiningDate: Date;

    @Column()
    adminPassword: string;

    @OneToMany(() => OrganizerEntity, organizer => organizer.admin, { cascade: true })
    organizers: OrganizerEntity[];

    @OneToMany(() => ClubEntity, club => club.admin, { cascade: true })
    clubs: ClubEntity[];
}
