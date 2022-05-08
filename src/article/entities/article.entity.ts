import { Column, Entity, BeforeInsert, Exclusion } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { ArticleDto } from '../dtos/article.dto';

@Entity('articles')
export class Article extends SoftDelete {
  @Column({ nullable: true })
  title: string;

  @Column("text")
  description: string;

  @Column({ nullable: true })
  image: string;

  toArticleDto(): ArticleDto {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
