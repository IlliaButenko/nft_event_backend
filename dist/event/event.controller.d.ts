/// <reference types="multer" />
import { UploadService } from 'src/common/upload/upload.service';
import { EventService } from './event.service';
import { CreateEventCardDto } from './dtos/create_event_card.dto';
import { CreateTicketDto } from './dtos/create_tickdt.dto';
import { Ticket } from './entities/ticket.entity';
export declare class EventController {
    private readonly uploadService;
    private readonly eventService;
    constructor(uploadService: UploadService, eventService: EventService);
    create_event_card(body: CreateEventCardDto, files: {
        large_image?: Express.Multer.File[];
        small_image?: Express.Multer.File[];
    }, req: any): Promise<{
        success: boolean;
        eventcard: import("./entities/event_card.entity").EventCard;
    } | {
        success: boolean;
        eventcard?: undefined;
    }>;
    getLatestEventCards(): Promise<any>;
    getAllEventCards(): Promise<any>;
    getEventCardById(id: string): Promise<any>;
    deleteEventById(id: string): Promise<any>;
    buy_ticket(body: CreateTicketDto, req: any): Promise<{
        success: boolean;
        ticket: Ticket;
    }>;
    user_tickets(req: any): Promise<any>;
    available_events(req: any): Promise<any>;
    getTickets(req: any): Promise<any>;
}
