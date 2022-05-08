"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const upload_module_1 = require("../common/upload/upload.module");
const event_card_entity_1 = require("./entities/event_card.entity");
const ticket_entity_1 = require("./entities/ticket.entity");
const event_controller_1 = require("./event.controller");
const event_service_1 = require("./event.service");
let EventModule = class EventModule {
};
EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([event_card_entity_1.EventCard, ticket_entity_1.Ticket]),
            upload_module_1.UploadModule
        ],
        controllers: [event_controller_1.EventController],
        providers: [event_service_1.EventService],
        exports: [event_service_1.EventService],
    })
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=event.module.js.map