import { Module } from '@nestjs/common';
import { OrganizerController } from './organizer.controller';
import { OrganizerService } from './organizer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../common/entities/organizer-entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [OrganizerController],
  providers: [OrganizerService],
})
export class OrganizerModule {}
