import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: string;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   background: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  venue_description: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  facebook: string;

  @ApiProperty()
  @IsString()
  twitter: string;

  @ApiProperty()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsString()
  tiktok: string;

  @ApiProperty()
  @IsString()
  telegram: string;

  @ApiProperty()
  @IsString()
  discord: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  creator: string;

  @ApiProperty()
  @IsString()
  tags: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  collection: string;

  @ApiProperty()
  green_pass_needed: string;

  @ApiProperty()
  @IsNotEmpty()
  total_tickets: number;
}