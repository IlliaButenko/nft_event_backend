import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatDate } from 'src/common/utils/date.util';
import { Raw, Repository } from 'typeorm';

import { getFromDto } from '../common/utils/repository.util';
import { CreateEventCardDto } from './dtos/create_event_card.dto'; 
import { EventCard } from './entities/event_card.entity';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventCard)
    private readonly eventcardRepository: Repository<EventCard>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async createEventCard(payload: any): Promise<EventCard> {
    const param = {
      ...payload,
      green_pass_needed: Number(payload.green_pass_needed) ? true : false,
    };
    console.log('event card create object: ', param);

    const eventCard: EventCard = getFromDto(param, new EventCard());
    await this.eventcardRepository.save(eventCard);

    return this.eventcardRepository.findOne({
      where: { id: eventCard.id },
    });
  }

  getAllEventCards(): Promise<EventCard[]> {
    return this.eventcardRepository.find({ relations: ['creator'] });
  }

  getLatestEventCards(): Promise<EventCard[]> {
    return this.eventcardRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['creator'],
      take: 10,
    });
  }

  findById(id: string): Promise<EventCard> {
    return this.eventcardRepository.findOne({
      relations: ['creator'],
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.eventcardRepository.delete(id);
  }

  async buyTicket(payload: any): Promise<Ticket> {
    const ticket: Ticket = getFromDto(payload, new Ticket());
    await this.ticketRepository.save(ticket);

    const eventCard = await this.eventcardRepository.findOne({
      where: { id: payload.eventcard },
    });
    eventCard.buy_count++;
    await this.eventcardRepository.save(eventCard);

    return this.ticketRepository.findOne({
      where: { id: ticket.id },
    });
  }

  async userTickets(userid): Promise<Ticket[]> {
    const tickets = this.ticketRepository.find({
      where: { buyer: userid },
      relations: ['eventcard', 'eventcard.creator'],
    });

    return tickets;
  }

  async availableEvents(): Promise<EventCard[]> {
    const today = formatDate(new Date());
    return this.eventcardRepository.find({
      where: {
        date: Raw((alias) => `${alias} > :date`, { date: today }),
      },
      order: { createdAt: 'DESC' },
      relations: ['creator'],
    });
  }

  async getTickets(): Promise<Ticket[]> {
    const tickets = this.ticketRepository.find({
      relations: ['buyer', 'eventcard', 'eventcard.creator'],
    });

    return tickets;
  }
}
