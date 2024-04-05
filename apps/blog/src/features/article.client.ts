import path from 'path';
import { Article } from './article';
import { ArticleMeta } from './article-meta';
import matter from 'gray-matter';
import fs from 'fs';

const ARTICLE_DIRECTORY = path.join(process.cwd(), 'src', 'articles');

export const ArticleClient = {
  find: (): Promise<Article[]> => {
    return Promise.resolve(
      fs.readdirSync(ARTICLE_DIRECTORY).map((article) => {
        const articlePath = path.join(ARTICLE_DIRECTORY, article);
        const { content, data } = matter(fs.readFileSync(articlePath, 'utf8'));
        const meta: ArticleMeta = data as ArticleMeta;

        return {
          slug: article.replace('.md', ''),
          meta,
          content
        };
      })
    );
  },
  get: (slug: string): Promise<Article> => {
    const articlePath = path.join(ARTICLE_DIRECTORY, slug + '.md');
    const { content, data } = matter(fs.readFileSync(articlePath, 'utf8'));

    const article: Article = {
      slug,
      meta: data as ArticleMeta,
      content
    };
    return Promise.resolve(article);
  }
};
