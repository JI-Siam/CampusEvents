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

    @Get('a')
    getG(){
        return "Hello Organizer";
    }

    // 1. Create event
    @Post('event')
    createEvent(@Body(EventValidationPipe) dto: CreateEventDto) {
        return this.service.createEvent(dto);
    }

    // 2. Get all events
    @Get('events')
    getAll() {
        return this.service.getAllEvents();
    }

    // 3. Get event by ID
    @Get('event/:id')
    getOne(@Param('id') id: number) {
        return this.service.getEvent(id);
    }

    // 4. Update event (PUT)
    @Put('event/:id')
    update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
        return this.service.updateEvent(id, dto);
    }

    // 5. Partial update (PATCH)
    @Patch('event/:id')
    patch(@Param('id') id: number, @Body() dto: UpdateEventDto) {
        return this.service.patchEvent(id, dto);
    }

    // 6. Delete event
    @Delete('event/:id')
    delete(@Param('id') id: number) {
        return this.service.deleteEvent(id);
    }

    // 7. Health check route (extra route)
    @Get('status')
    status() {
        return { message: 'Organizer Module Running' };
    }
}
