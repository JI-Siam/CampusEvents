import { Module } from '@nestjs/common';
import { OrganizerController } from './organizer.controller';
import { OrganizerService } from './organizer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../common/entities/organizer-entities/event.entity';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    AuthModule],
  controllers: [OrganizerController],
  providers: [OrganizerService],
})
export class OrganizerModule { }
