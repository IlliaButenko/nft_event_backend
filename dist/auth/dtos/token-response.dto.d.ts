import { UserDto } from '../../user/dtos/user.dto';
export declare class TokenResponseDto {
    accessToken: string;
    user: UserDto;
    constructor(token: string, user: UserDto);
}
