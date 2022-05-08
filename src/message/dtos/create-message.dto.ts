import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/user/dtos/user.dto';

export class CreateMessageDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    receiver: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    link: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
}