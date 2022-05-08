"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const date_util_1 = require("../common/utils/date.util");
const typeorm_2 = require("typeorm");
const repository_util_1 = require("../common/utils/repository.util");
const event_card_entity_1 = require("./entities/event_card.entity");
const ticket_entity_1 = require("./entities/ticket.entity");
let EventService = class EventService {
    constructor(eventcardRepository, ticketRepository) {
        this.eventcardRepository = eventcardRepository;
        this.ticketRepository = ticketRepository;
    }
    async createEventCard(payload) {
        const param = Object.assign(Object.assign({}, payload), { green_pass_needed: Number(payload.green_pass_needed) ? true : false });
        console.log('event card create object: ', param);
        const eventCard = (0, repository_util_1.getFromDto)(param, new event_card_entity_1.EventCard());
        await this.eventcardRepository.save(eventCard);
        return this.eventcardRepository.findOne({
            where: { id: eventCard.id },
        });
    }
    getAllEventCards() {
        return this.eventcardRepository.find({ relations: ['creator'] });
    }
    getLatestEventCards() {
        return this.eventcardRepository.find({
            order: { createdAt: 'DESC' },
            relations: ['creator'],
            take: 10,
        });
    }
    findById(id) {
        return this.eventcardRepository.findOne({
            relations: ['creator'],
            where: { id },
        });
    }
    async remove(id) {
        await this.eventcardRepository.delete(id);
    }
    async buyTicket(payload) {
        const ticket = (0, repository_util_1.getFromDto)(payload, new ticket_entity_1.Ticket());
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
    async userTickets(userid) {
        const tickets = this.ticketRepository.find({
            where: { buyer: userid },
            relations: ['eventcard', 'eventcard.creator'],
        });
        return tickets;
    }
    async availableEvents() {
        const today = (0, date_util_1.formatDate)(new Date());
        return this.eventcardRepository.find({
            where: {
                date: (0, typeorm_2.Raw)((alias) => `${alias} > :date`, { date: today }),
            },
            order: { createdAt: 'DESC' },
            relations: ['creator'],
        });
    }
    async getTickets() {
        const tickets = this.ticketRepository.find({
            relations: ['buyer', 'eventcard', 'eventcard.creator'],
        });
        return tickets;
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_card_entity_1.EventCard)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map