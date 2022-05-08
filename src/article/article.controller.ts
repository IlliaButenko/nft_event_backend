import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Request,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { EmailService } from '../kit/email/email.service';
import * as randomstring from 'randomstring';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/common/upload/upload.service';
import { ArticleService } from './article.service';
import { ArticleDto } from './dtos/article.dto';

@Controller('api/article')
@ApiTags('Article')
export class ArticleController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly articleService: ArticleService,
  ) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async create_article(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const fileName =
      randomstring.generate({
        length: 16,
        charset: 'alphabetic',
      }) + '.jpg';

    const path = 'assets/uploads/article/' + fileName;
    await this.uploadService.upload(path, file);
    const article = await this.articleService.createArticle({
      image: path,
      title: body.title,
      description: body.description,
    });
    return { success: true, article: article };
  }

  @Get()
  @ApiOkResponse({ type: ArticleDto })
  async getAllArticles(): Promise<any> {
    const articles = await this.articleService.getAllArticles();
    return {
      success: true,
      articles: articles.map((article) => article.toArticleDto()),
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleDto })
  async getArticleById(@Param('id') id: string): Promise<any> {
    const article = await this.articleService.findById(id);
    if (article) {
      return { success: true, article: article.toArticleDto() };
    } else {
      return { success: false, message: "Can't find the article" };
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleDto })
  async deleteArticleById(@Param('id') id: string): Promise<any> {
    try {
      await this.articleService.remove(id);
      return { success: true, message: 'Article deleted successfully!' };
    } catch (error) {
      return { success: false, message: "Can't find the article" };
    }
  }
}
