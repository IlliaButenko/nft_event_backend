import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/user/dtos/user.dto';

export class MessageDto {
    @ApiProperty()
    readonly id: string;
    
    @ApiProperty()
    readonly receiver: string;

    @ApiProperty()
    readonly link: string;

    @ApiProperty()
    readonly content: string;

    @ApiProperty()
    readonly creator: UserDto;

    @ApiProperty()
    readonly createdAt: any;

    @ApiProperty()
    readonly updatedAt: any;
}