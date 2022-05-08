import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly user_type: string;

  @ApiProperty()
  readonly login_user: string;

  @ApiProperty()
  readonly email_verified: boolean;

  @ApiProperty()
  readonly followers: number;

  @ApiProperty()
  readonly medium: string;

  @ApiProperty()
  readonly instagram: string;

  @ApiProperty()
  readonly twitter: string;

  @ApiProperty()
  readonly facebook: string;

  @ApiProperty()
  readonly avatar: string;

  @ApiProperty()
  readonly background: string;

  @ApiProperty()
  readonly wallet_address: string;
}
