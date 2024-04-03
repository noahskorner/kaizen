import Link from 'next/link';
import { merriweather } from '../fonts';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface ArticleMeta {
  title: string;
  preview: string;
  author: string;
  date: string;
  tags: string[];
}
const ARTICLE_DIRECTORY = path.join(process.cwd(), 'src', 'articles');
const ARTICLES = fs.readdirSync(ARTICLE_DIRECTORY).map((article) => {
  const articlePath = path.join(ARTICLE_DIRECTORY, article);
  const { content, data } = matter(fs.readFileSync(articlePath, 'utf8'));
  const meta: ArticleMeta = data as ArticleMeta;

  return { slug: article.replace('.md', ''), meta, content };
});

const formatDate = (iso: string) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const date = new Date(iso);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export default function Blog() {
  return (
    <div className="hw-full flex justify-center">
      <div className="flex w-full max-w-7xl flex-col gap-8 p-8 text-slate-900">
        <div className="flex h-[24rem] w-full items-stretch gap-8">
          <div className="h-full w-1/2 flex-1 rounded-lg bg-indigo-950"></div>
          <div className="flex h-full w-1/2 flex-1 flex-col justify-center gap-y-4">
            <div className="flex gap-1">
              {ARTICLES[0].meta.tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className="rounded-full bg-indigo-700 px-3 py-1 text-sm text-white">
                    {tag}
                  </span>
                );
              })}
            </div>
            <Link href={`/blog/${ARTICLES[0].slug}`}>
              <h2
                className={`${merriweather.className} text-4xl font-extrabold hover:underline`}>
                {ARTICLES[0].meta.title}
              </h2>
            </Link>
            <p>{ARTICLES[0].meta.preview}</p>
            <div className="text-sm text-slate-600">
              <span>{formatDate(ARTICLES[0].meta.date)}</span>&nbsp;|&nbsp;
              <span>3 min read</span>
            </div>
          </div>
        </div>
        {ARTICLES.slice(1).map((article) => (
          <div key={article.slug} className="flex flex-col gap-y-4">
            <div className="flex gap-1">
              {article.meta.tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className="rounded-full bg-indigo-700 px-3 py-1 text-sm text-white">
                    {tag}
                  </span>
                );
              })}
            </div>
            <Link href={`/blog/${article.slug}`}>
              <h2
                className={`${merriweather.className} text-2xl font-bold hover:underline`}>
                {article.meta.title}
              </h2>
            </Link>
            <p>{article.meta.preview}</p>
            <div className="text-sm text-slate-600">
              <span>{formatDate(article.meta.date)}</span>&nbsp;|&nbsp;
              <span>3 min read</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
