import Link from 'next/link';
import { merriweather } from '../fonts';

export default function Blog() {
  return (
    <div className="hw-full flex justify-center">
      <div className="flex w-full max-w-7xl flex-col gap-8 p-8 text-slate-900">
        <div className="flex h-[24rem] w-full items-stretch gap-8">
          <div className="h-full w-1/2 flex-1 rounded-lg bg-indigo-800"></div>
          <div className="flex h-full w-1/2 flex-1 flex-col justify-center gap-y-4">
            <div>
              <span className="rounded-full bg-indigo-700 px-3 py-1 text-sm text-white">
                Chip
              </span>
            </div>
            <Link href="/blog/unique-blog-name">
              <h2
                className={`${merriweather.className} text-4xl font-extrabold hover:underline`}>
                Featured article name
              </h2>
            </Link>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              totam est inventore quas! Repudiandae ducimus ipsam porro
              aspernatur aliquid id deserunt, repellat ab possimus impedit.
            </p>
            <div className="text-sm text-slate-600">
              <span>1 March, 2022</span> | <span>3 min read</span>
            </div>
          </div>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-y-4">
            <div>
              <span className="rounded-full bg-indigo-700 px-3 py-1 text-sm text-white">
                Chip
              </span>
            </div>
            <Link href="/blog/unique-blog-name">
              <h2
                className={`${merriweather.className} text-2xl font-bold hover:underline`}>
                Lorem ipsum dolor sit amet.
              </h2>
            </Link>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              totam est inventore quas! Repudiandae ducimus ipsam porro
              aspernatur aliquid id deserunt, repellat ab possimus impedit.
            </p>
            <div className="text-sm text-slate-600">
              <span>1 March, 2022</span> | <span>3 min read</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
