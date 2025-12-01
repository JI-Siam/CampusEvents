import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { JwtAuthGuard } from '../common/auth/jwt.guard';
import { CreateEventDto } from '../common/dto/organizer-dto/create-event.dto';
import { UpdateEventDto } from '../common/dto/organizer-dto/update-event.dto';
import { EventValidationPipe } from '../common/pipes/organizer-validation/event-validation.pipe';

@Controller('organizer')
@UseGuards(JwtAuthGuard)
export class OrganizerController {
    constructor(private readonly service: OrganizerService) { }

    //CRUD on Event
    @Post('event')
    createEvent(@Body(EventValidationPipe) dto: CreateEventDto) {
        return this.service.createEvent(dto);
    }

    @Get('events')
    getAll() {
        return this.service.getAllEvents();
    }

    @Get('event/:id')
    getOne(@Param('id') id: number) {
        return this.service.getEvent(id);
    }

    @Put('event/:id')
    update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
        return this.service.updateEvent(id, dto);
    }

    @Patch('event/:id')
    patch(@Param('id') id: number, @Body() dto: UpdateEventDto) {
        return this.service.patchEvent(id, dto);
    }

    @Delete('event/:id')
    delete(@Param('id') id: number) {
        return this.service.deleteEvent(id);
    }

    @Get('status')
    status() {
        return { message: 'Organizer Module Running' };
    }

}
