import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
    @ApiProperty()
    readonly id: string;
    
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly image: string;

    @ApiProperty()
    readonly createdAt: any;

    @ApiProperty()
    readonly updatedAt: any;
}
