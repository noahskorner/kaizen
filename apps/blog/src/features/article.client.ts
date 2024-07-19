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
        const articleDirectory = path.join(ARTICLE_DIRECTORY, article);
        const articlePath = path.join(articleDirectory, 'article.md');
        const { content, data } = matter(fs.readFileSync(articlePath, 'utf8'));
        const meta: ArticleMeta = data as ArticleMeta;

        return {
          slug: article,
          meta,
          content
        };
      })
    );
  },
  get: (slug: string): Promise<Article> => {
    const articleDirectory = path.join(ARTICLE_DIRECTORY, slug);
    const articlePath = path.join(articleDirectory, 'article.md');
    const { content, data } = matter(fs.readFileSync(articlePath, 'utf8'));

    const article: Article = {
      slug,
      meta: data as ArticleMeta,
      content
    };
    return Promise.resolve(article);
  }
};
