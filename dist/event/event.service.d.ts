import { Repository } from 'typeorm';
import { EventCard } from './entities/event_card.entity';
import { Ticket } from './entities/ticket.entity';
export declare class EventService {
    private readonly eventcardRepository;
    private readonly ticketRepository;
    constructor(eventcardRepository: Repository<EventCard>, ticketRepository: Repository<Ticket>);
    createEventCard(payload: any): Promise<EventCard>;
    getAllEventCards(): Promise<EventCard[]>;
    getLatestEventCards(): Promise<EventCard[]>;
    findById(id: string): Promise<EventCard>;
    remove(id: string): Promise<void>;
    buyTicket(payload: any): Promise<Ticket>;
    userTickets(userid: any): Promise<Ticket[]>;
    availableEvents(): Promise<EventCard[]>;
    getTickets(): Promise<Ticket[]>;
}
