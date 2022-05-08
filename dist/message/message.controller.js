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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const email_service_1 = require("../kit/email/email.service");
const create_message_dto_1 = require("./dtos/create-message.dto");
const message_dto_1 = require("./dtos/message.dto");
const message_service_1 = require("./message.service");
let MessageController = class MessageController {
    constructor(messageService, emailservice) {
        this.messageService = messageService;
        this.emailservice = emailservice;
    }
    async create(body, req) {
        try {
            this.emailservice.sendMessage(body.receiver, body.link, body.content);
            const message = await this.messageService.createMessage(body);
            return { success: true, message: message };
        }
        catch (error) {
            console.log(error);
            return { success: false };
        }
    }
    async getLatestMessage() {
        const eventCards = await this.messageService.getLatestEventCards();
        return { success: true, eventcards: eventCards.map(eventcard => eventcard.toMessageDto()) };
    }
    async getAllEventCards() {
        const eventCards = await this.messageService.getAllEventCards();
        return { success: true, eventcards: eventCards.map(eventcard => eventcard.toMessageDto()) };
    }
    async getEventCardById(id) {
        const eventCard = await this.messageService.findById(id);
        if (eventCard) {
            return { success: true, eventcard: eventCard.toMessageDto() };
        }
        else {
            return { success: false, message: "Can't find the event card" };
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('latest'),
    (0, swagger_1.ApiOkResponse)({ type: message_dto_1.MessageDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getLatestMessage", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOkResponse)({ type: message_dto_1.MessageDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getAllEventCards", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: message_dto_1.MessageDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getEventCardById", null);
MessageController = __decorate([
    (0, common_1.Controller)('api/message'),
    (0, swagger_1.ApiTags)('Message'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        email_service_1.EmailService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map