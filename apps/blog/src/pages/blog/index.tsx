import Link from 'next/link';
import Tag from '../../features/tag';
import Image from 'next/image';
import articleImage from '../../../public/article-image.jpg';
import { Article } from '../../features/article';
import { formatDate } from '../../features/format-date';
import { GetStaticProps } from 'next';
import { ArticleClient } from '../../features/article.client';

export interface BlogPageProps {
  articles: Article[];
}

export default function BlogPage({ articles }: BlogPageProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl flex-col gap-4 p-4 text-slate-900 md:gap-8 md:p-8">
        <div className="flex w-full flex-col items-stretch gap-8 md:flex-row">
          <Image
            className="h-full max-h-[24rem] w-full flex-1 rounded-lg object-cover object-left-top md:w-1/2"
            src={articleImage}
            alt={'Featured article'}></Image>
          <div className="flex h-full w-full flex-1 flex-col justify-center gap-y-4 md:w-1/2">
            <div className="flex gap-1">
              {articles[0].meta.tags.map((tag, index) => {
                return <Tag key={index}>{tag}</Tag>;
              })}
            </div>
            <Link href={`/blog/${articles[0].slug}`}>
              <h2 className="font-secondary text-4xl font-extrabold hover:underline">
                {articles[0].meta.title}
              </h2>
            </Link>
            <p>{articles[0].meta.preview}</p>
            <div className="text-sm text-slate-600">
              <span>{formatDate(articles[0].meta.date)}</span>&nbsp;|&nbsp;
              <span>{articles[0].meta.author}</span>
            </div>
          </div>
        </div>
        {articles.slice(1).map((article) => (
          <div key={article.slug} className="flex flex-col gap-y-4">
            <div className="flex gap-1">
              {article.meta.tags.map((tag, index) => {
                return <Tag key={index}>{tag}</Tag>;
              })}
            </div>
            <Link href={`/blog/${article.slug}`}>
              <h2 className="font-secondary text-2xl font-bold hover:underline">
                {article.meta.title}
              </h2>
            </Link>
            <p>{article.meta.preview}</p>
            <div className="text-sm text-slate-600">
              <span>{formatDate(article.meta.date)}</span>&nbsp;|&nbsp;
              <span>{article.meta.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const articles = await ArticleClient.find();
  return {
    props: {
      articles
    }
  };
};
