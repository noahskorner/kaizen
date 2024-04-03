import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import './page.css';

const ARTICLE_DIRECTORY = path.join(process.cwd(), 'src', 'articles');

export default function Article({ params }: { params: { slug: string } }) {
  const articlePath = path.join(ARTICLE_DIRECTORY, params.slug + '.md');
  const { content, data } = matter(fs.readFileSync(articlePath, 'utf8'));

  return (
    <div className="flex w-full justify-center p-8">
      <div className="w-full max-w-7xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
