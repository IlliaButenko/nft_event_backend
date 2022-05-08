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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCard = void 0;
const typeorm_1 = require("typeorm");
const soft_delete_1 = require("../../common/core/soft-delete");
const user_entity_1 = require("../../user/entities/user.entity");
const ticket_entity_1 = require("./ticket.entity");
let EventCard = class EventCard extends soft_delete_1.SoftDelete {
    toEventCardDto() {
        return {
            id: this.id,
            name: this.name,
            location: this.location,
            date: this.date,
            likes_number: this.likes_number,
            background: this.background,
            picture_large: this.picture_large,
            picture_small: this.picture_small,
            price: this.price,
            venue_description: this.venue_description,
            description: this.description,
            facebook: this.facebook,
            twitter: this.twitter,
            instagram: this.instagram,
            tiktok: this.tiktok,
            telegram: this.telegram,
            discord: this.discord,
            creator: this.creator.toUserDto(),
            tags: this.tags,
            category: this.category,
            collection: this.collection,
            green_pass_needed: this.green_pass_needed,
            total_tickets: this.total_tickets,
            buy_count: this.buy_count,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventCard.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventCard.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventCard.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EventCard.prototype, "likes_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "background", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "picture_large", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "picture_small", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EventCard.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], EventCard.prototype, "venue_description", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], EventCard.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "facebook", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "twitter", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "instagram", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "tiktok", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "telegram", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "discord", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.event_cards),
    __metadata("design:type", user_entity_1.User)
], EventCard.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventCard.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventCard.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventCard.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], EventCard.prototype, "green_pass_needed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EventCard.prototype, "total_tickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, ticket => ticket.eventcard),
    __metadata("design:type", Array)
], EventCard.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], EventCard.prototype, "buy_count", void 0);
EventCard = __decorate([
    (0, typeorm_1.Entity)('event_cards')
], EventCard);
exports.EventCard = EventCard;
//# sourceMappingURL=event_card.entity.js.map