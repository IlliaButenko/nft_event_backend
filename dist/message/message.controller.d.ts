import { EmailService } from '../kit/email/email.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    private readonly emailservice;
    constructor(messageService: MessageService, emailservice: EmailService);
    create(body: CreateMessageDto, req: any): Promise<{
        success: boolean;
        message: import("./entities/message.entity").Message;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    getLatestMessage(): Promise<any>;
    getAllEventCards(): Promise<any>;
    getEventCardById(id: string): Promise<any>;
}
