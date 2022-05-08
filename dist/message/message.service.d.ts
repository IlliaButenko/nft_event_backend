import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
    createMessage(payload: any): Promise<Message>;
    getAllEventCards(): Promise<Message[]>;
    getLatestEventCards(): Promise<Message[]>;
    findById(id: string): Promise<Message>;
}
