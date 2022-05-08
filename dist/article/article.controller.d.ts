/// <reference types="multer" />
import { UploadService } from 'src/common/upload/upload.service';
import { ArticleService } from './article.service';
export declare class ArticleController {
    private readonly uploadService;
    private readonly articleService;
    constructor(uploadService: UploadService, articleService: ArticleService);
    create_article(body: any, file: Express.Multer.File, req: any): Promise<{
        success: boolean;
        article: import("./entities/article.entity").Article;
    }>;
    getAllArticles(): Promise<any>;
    getArticleById(id: string): Promise<any>;
    deleteArticleById(id: string): Promise<any>;
}
