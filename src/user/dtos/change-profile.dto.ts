import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ChangeProfileDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  background?: string;
}
