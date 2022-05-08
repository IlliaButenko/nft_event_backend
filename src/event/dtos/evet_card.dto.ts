import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dtos/user.dto';

export class EventCardDto {
    @ApiProperty()
    readonly id: string;
    
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly location: string;

    @ApiProperty()
    readonly date: string;

    @ApiProperty()
    readonly likes_number: number;

    @ApiProperty()
    readonly background: string;

    @ApiProperty()
    readonly picture_large: string;

    @ApiProperty()
    readonly picture_small: string;

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly venue_description: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly facebook: string;

    @ApiProperty()
    readonly twitter: string;

    @ApiProperty()
    readonly instagram: string;

    @ApiProperty()
    readonly tiktok: string;

    @ApiProperty()
    readonly telegram: string;

    @ApiProperty()
    readonly discord: string;

    @ApiProperty()
    readonly creator: UserDto;

    @ApiProperty()
    readonly tags: string;

    @ApiProperty()
    readonly category: string;

    @ApiProperty()
    readonly collection: string;

    @ApiProperty()
    readonly green_pass_needed: boolean;

    @ApiProperty()
    readonly total_tickets: number;

    @ApiProperty()
    readonly buy_count: number;

    @ApiProperty()
    readonly createdAt: any;

    @ApiProperty()
    readonly updatedAt: any;
}
