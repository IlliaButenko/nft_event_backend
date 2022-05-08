import { Column, Entity, BeforeInsert, Exclusion, ManyToOne } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { User } from 'src/user/entities/user.entity';
import { EventCard } from './event_card.entity';

@Entity('tickets')
export class Ticket extends SoftDelete {
    @ManyToOne(() => EventCard, event_card => event_card.tickets)
    eventcard: string;

    @Column()
    price: number;

    @Column()
    wallet_address: string;

    @ManyToOne(() => User, user => user.tickets)
    buyer: User;

    @Column()
    pay_order_id: string;
}