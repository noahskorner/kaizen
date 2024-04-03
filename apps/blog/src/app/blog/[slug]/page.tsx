import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import './page.css';
import { merriweather } from '../../fonts';
import remarkGfm from 'remark-gfm';
import { ArticleMeta } from '../page';
import Tag from '../../../components/tag';

const ARTICLE_DIRECTORY = path.join(process.cwd(), 'src', 'articles');

export default function Article({ params }: { params: { slug: string } }) {
  const articlePath = path.join(ARTICLE_DIRECTORY, params.slug + '.md');
  const { content, data } = matter(fs.readFileSync(articlePath, 'utf8'));
  const meta = data as ArticleMeta;

  return (
    <>
      <style>{`
    h1, h2 {
      font-family: ${merriweather.style.fontFamily};
    }
  `}</style>
      <div className="flex w-full justify-center p-8">
        <div className="flex w-full max-w-7xl flex-col gap-y-2">
          <div className="flex gap-x-2">
            {meta.tags.map((tag, index) => {
              return <Tag key={index}>{tag}</Tag>;
            })}
          </div>
          <div className="markdown-container">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
