import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ChangePasswordDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  old_password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  new_password: string;
}
