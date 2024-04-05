import { ArticleMeta } from './article-meta';

export interface Article {
  slug: string;
  meta: ArticleMeta;
  content: string;
}
