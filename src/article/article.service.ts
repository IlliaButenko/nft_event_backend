import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDto } from '../auth/dtos/register.dto';
import { getFromDto } from '../common/utils/repository.util';
import { CreateArticleDto } from './dtos/create-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(payload: CreateArticleDto): Promise<Article> {
    const article: Article = getFromDto(payload, new Article());
    await this.articleRepository.save(article);

    return this.articleRepository.findOne({
      where: { id: article.id },
    });
  }

  getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: string): Promise<Article> {
    return this.articleRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
