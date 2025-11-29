import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../common/entities/organizer-entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../common/dto/organizer-dto/create-event.dto';
import { UpdateEventDto } from '../common/dto/organizer-dto/update-event.dto';

@Injectable()
export class OrganizerService {
  constructor(
    @InjectRepository(Event) private eventRepo: Repository<Event>,
  ) {}

  async createEvent(dto: CreateEventDto) {
    const event = this.eventRepo.create(dto);
    return this.eventRepo.save(event);
  }

  async getAllEvents() {
    return this.eventRepo.find();
  }

  async getEvent(id: number) {
    const event = await this.eventRepo.findOne({ where: { id } });

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    return event;
  }

  async updateEvent(id: number, dto: UpdateEventDto) {
    await this.eventRepo.update(id, dto);
    return this.getEvent(id);
  }

  async patchEvent(id: number, dto: UpdateEventDto) {
    await this.eventRepo.update(id, dto);
    return this.getEvent(id);
  }

  async deleteEvent(id: number) {
    const result = await this.eventRepo.delete(id);

    if (!result.affected) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'Event deleted successfully' };
  }
}
