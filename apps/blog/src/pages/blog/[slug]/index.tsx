import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Tag from '../../../features/tag';
import styles from './article.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ArticleClient } from '../../../features/article.client';
import { Article } from '../../../features/article';

interface ArticlePageProps {
  article: Article;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <div className="flex w-full justify-center p-8">
      <div className="flex w-full max-w-7xl flex-col gap-y-2">
        <div className="flex gap-x-2">
          {article.meta.tags.map((tag, index) => {
            return <Tag key={index}>{tag}</Tag>;
          })}
        </div>
        <div className={styles['markdown-container']}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await ArticleClient.find();
  const paths = articles.map((article) => ({
    params: { slug: article.slug }
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const article = await ArticleClient.get(slug);

  return {
    props: {
      article
    }
  };
};
