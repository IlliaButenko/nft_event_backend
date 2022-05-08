import { SoftDelete } from 'src/common/core/soft-delete';
import { ArticleDto } from '../dtos/article.dto';
export declare class Article extends SoftDelete {
    title: string;
    description: string;
    image: string;
    toArticleDto(): ArticleDto;
}
