import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizerEntity } from '../common/entities/admin-entities/organizer.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(OrganizerEntity)
        private repo: Repository<OrganizerEntity>,
    ) { }

    async findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { organizerId :id} });
    }

    findByPhone(phone: string) {
        return this.repo.findOne({ where: { organizerPhone : phone } });
    }

    findByEmail(email: string){

    }

    create(data: Partial<OrganizerEntity>) {
        const organizer = this.repo.create(data);
        return this.repo.save(organizer);
    }

    update(id: number, data: Partial<OrganizerEntity>) {
        return this.repo.update(id, data);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
