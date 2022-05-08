import { SoftDelete } from 'src/common/core/soft-delete';
import { User } from 'src/user/entities/user.entity';
export declare class Ticket extends SoftDelete {
    eventcard: string;
    price: number;
    wallet_address: string;
    buyer: User;
    pay_order_id: string;
}
