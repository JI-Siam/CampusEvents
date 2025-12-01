import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AdminEntity } from 'src/common/entities/admin-entities/admin.entity';

@Entity('organizers')
export class OrganizerEntity {
    @PrimaryGeneratedColumn()
    organizerId: number;

    @Column()
    organizerName: string;

    @Column({ unique: true })
    organizerEmail: string;

    @Column({ unique: true })
    organizerPhone: string;

    @Column({ type: 'date' })
    organizerDob: Date;

    @Column()
    organizerPassword: string;

    @ManyToOne(() => AdminEntity, admin => admin.organizers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'adminId' })
    admin: AdminEntity;
}
