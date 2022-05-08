import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../user/dtos/user.dto';

export class TokenResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserDto;

  constructor(token: string, user: UserDto) {
    this.accessToken = token;
    this.user = user;
  }
}
