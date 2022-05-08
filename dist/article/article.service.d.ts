import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { Article } from './entities/article.entity';
export declare class ArticleService {
    private readonly articleRepository;
    constructor(articleRepository: Repository<Article>);
    createArticle(payload: CreateArticleDto): Promise<Article>;
    getAllArticles(): Promise<Article[]>;
    findById(id: string): Promise<Article>;
    remove(id: string): Promise<void>;
}
