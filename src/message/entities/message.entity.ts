import { Column, Entity, BeforeInsert, Exclusion, ManyToOne } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { User } from 'src/user/entities/user.entity';
import { MessageDto } from '../dtos/message.dto';

@Entity('messages')
export class Message extends SoftDelete {
    @Column()
    receiver: string;

    @Column()
    link: string;

    @Column("text")
    content: string;

    @ManyToOne(() => User, user => user.messages)
    creator: User;

    toMessageDto(): MessageDto {
        return {
            id: this.id,
            receiver: this.receiver,
            link: this.link,
            content: this.content,
            creator: this.creator.toUserDto(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}