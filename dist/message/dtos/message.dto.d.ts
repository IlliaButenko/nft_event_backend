import { UserDto } from 'src/user/dtos/user.dto';
export declare class MessageDto {
    readonly id: string;
    readonly receiver: string;
    readonly link: string;
    readonly content: string;
    readonly creator: UserDto;
    readonly createdAt: any;
    readonly updatedAt: any;
}
