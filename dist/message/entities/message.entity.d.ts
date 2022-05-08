import { SoftDelete } from 'src/common/core/soft-delete';
import { User } from 'src/user/entities/user.entity';
import { MessageDto } from '../dtos/message.dto';
export declare class Message extends SoftDelete {
    receiver: string;
    link: string;
    content: string;
    creator: User;
    toMessageDto(): MessageDto;
}
