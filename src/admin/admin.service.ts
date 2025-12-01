import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizerEntity } from '../common/entities/admin-entities/organizer.entity';
import { CreateOrganizerDto } from 'src/common/dto/admin-dto/create-organizer.dto';
import { UpdateOrganizerDto } from 'src/common/dto/admin-dto/update-organizer.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(OrganizerEntity)
        private repo: Repository<OrganizerEntity>,
    ) { }

    async createOrganizer(dto: CreateOrganizerDto) {
        const organizer = this.repo.create(dto);
        return this.repo.save(organizer);
    }

    async findAll() {
        return this.repo.find();
    }

    async findOneById(id: number) {
        const organizer = await this.repo.findOne({ where: { organizerId: id } });
        if (!organizer) {
            throw new HttpException('Organizer not found', HttpStatus.NOT_FOUND);
        }
        return organizer;
    }

    async findByPhone(phone: string) {
        const organizer = await this.repo.findOne({ where: { organizerPhone: phone } });
        if (!organizer) {
            throw new HttpException('Organizer not found', HttpStatus.NOT_FOUND);
        }
        return organizer;
    }

    async updateOrganizer(id: number, dto: UpdateOrganizerDto) {
        await this.repo.update(id, dto);
        return this.findOneById(id);
    }

    async patchOrganizer(id: number, dto: UpdateOrganizerDto) {
        await this.repo.update(id, dto);
        return this.findOneById(id);
    }

    async removeOrganizer(id: number) {
        const result = await this.repo.delete(id);

        if (!result.affected) {
            throw new HttpException('Organizer not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Organizer deleted successfully' };
    }
}
