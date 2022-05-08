import { UserDto } from 'src/user/dtos/user.dto';
export declare class EventCardDto {
    readonly id: string;
    readonly name: string;
    readonly location: string;
    readonly date: string;
    readonly likes_number: number;
    readonly background: string;
    readonly picture_large: string;
    readonly picture_small: string;
    readonly price: number;
    readonly venue_description: string;
    readonly description: string;
    readonly facebook: string;
    readonly twitter: string;
    readonly instagram: string;
    readonly tiktok: string;
    readonly telegram: string;
    readonly discord: string;
    readonly creator: UserDto;
    readonly tags: string;
    readonly category: string;
    readonly collection: string;
    readonly green_pass_needed: boolean;
    readonly total_tickets: number;
    readonly buy_count: number;
    readonly createdAt: any;
    readonly updatedAt: any;
}
