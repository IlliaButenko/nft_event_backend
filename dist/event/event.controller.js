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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const randomstring = require("randomstring");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("../common/upload/upload.service");
const event_service_1 = require("./event.service");
const evet_card_dto_1 = require("./dtos/evet_card.dto");
const create_event_card_dto_1 = require("./dtos/create_event_card.dto");
const create_tickdt_dto_1 = require("./dtos/create_tickdt.dto");
const ticket_entity_1 = require("./entities/ticket.entity");
let EventController = class EventController {
    constructor(uploadService, eventService) {
        this.uploadService = uploadService;
        this.eventService = eventService;
    }
    async create_event_card(body, files, req) {
        try {
            const largefileName = randomstring.generate({
                length: 16,
                charset: 'alphabetic',
            }) + '.jpg';
            const smallfileName = randomstring.generate({
                length: 16,
                charset: 'alphabetic',
            }) + '.jpg';
            const large_path = 'assets/uploads/eventcards/' + largefileName;
            const small_path = 'assets/uploads/eventcards/' + smallfileName;
            await this.uploadService.upload(large_path, files.large_image[0]);
            await this.uploadService.upload(small_path, files.small_image[0]);
            const eventCard = await this.eventService.createEventCard(Object.assign({ picture_large: large_path, picture_small: small_path }, body));
            return { success: true, eventcard: eventCard };
        }
        catch (error) {
            console.log(error);
            return { success: false };
        }
    }
    async getLatestEventCards() {
        const eventCards = await this.eventService.getLatestEventCards();
        return {
            success: true,
            eventcards: eventCards.map((eventcard) => eventcard.toEventCardDto()),
        };
    }
    async getAllEventCards() {
        const eventCards = await this.eventService.getAllEventCards();
        return {
            success: true,
            eventcards: eventCards.map((eventcard) => eventcard.toEventCardDto()),
        };
    }
    async getEventCardById(id) {
        const eventCard = await this.eventService.findById(id);
        if (eventCard) {
            return { success: true, eventcard: eventCard.toEventCardDto() };
        }
        else {
            return { success: false, message: "Can't find the event card" };
        }
    }
    async deleteEventById(id) {
        try {
            await this.eventService.remove(id);
            return { success: true, message: 'Event deleted successfully!' };
        }
        catch (error) {
            return { success: false, message: "Can't find the event" };
        }
    }
    async buy_ticket(body, req) {
        console.log('ticket param: ', body, req.user);
        const ticket = await this.eventService.buyTicket(Object.assign(Object.assign({}, body), { buyer: req.user.id }));
        return { success: true, ticket: ticket };
    }
    async user_tickets(req) {
        const userid = req.user.id;
        const tickets = await this.eventService.userTickets(userid);
        return { success: true, tickets: tickets };
    }
    async available_events(req) {
        const events = await this.eventService.availableEvents();
        return { success: true, events: events };
    }
    async getTickets(req) {
        const tickets = await this.eventService.getTickets();
        return { success: true, tickets: tickets };
    }
};
__decorate([
    (0, common_1.Post)('create_eventcard'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'large_image', maxCount: 1 },
        { name: 'small_image', maxCount: 1 },
    ])),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_card_dto_1.CreateEventCardDto, Object, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create_event_card", null);
__decorate([
    (0, common_1.Get)('eventcard/latest'),
    (0, swagger_1.ApiOkResponse)({ type: evet_card_dto_1.EventCardDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getLatestEventCards", null);
__decorate([
    (0, common_1.Get)('eventcard'),
    (0, swagger_1.ApiOkResponse)({ type: evet_card_dto_1.EventCardDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getAllEventCards", null);
__decorate([
    (0, common_1.Get)('/eventcard/:id'),
    (0, swagger_1.ApiOkResponse)({ type: evet_card_dto_1.EventCardDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventCardById", null);
__decorate([
    (0, common_1.Delete)('/eventcard/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({ type: evet_card_dto_1.EventCardDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEventById", null);
__decorate([
    (0, common_1.Post)('eventcard/buy_ticket'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tickdt_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "buy_ticket", null);
__decorate([
    (0, common_1.Get)('eventcard/user_tickets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({ type: ticket_entity_1.Ticket }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "user_tickets", null);
__decorate([
    (0, common_1.Get)('eventcard/available_events'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({ type: ticket_entity_1.Ticket }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "available_events", null);
__decorate([
    (0, common_1.Get)('eventcard/tickets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({ type: ticket_entity_1.Ticket }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getTickets", null);
EventController = __decorate([
    (0, common_1.Controller)('api/event'),
    (0, swagger_1.ApiTags)('Event'),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        event_service_1.EventService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map