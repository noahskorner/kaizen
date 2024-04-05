import './globals.css';
import Link from 'next/link';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col items-stretch font-primary">
      <nav className="fixed flex h-24 w-full items-center justify-between border-b border-slate-800 bg-slate-950 p-8 shadow">
        <div className="w-1/3"></div>
        <div className="hidden lg:flex">
          <Link
            href="/blog"
            className="cursor-pointer rounded-full px-4 py-2 text-sm font-light text-white hover:underline">
            Blog
          </Link>
          <a className="cursor-pointer rounded-full px-4 py-2 text-sm font-light text-white hover:underline">
            Capabilities
          </a>
          <a className="cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-light text-white hover:underline">
            About Us
          </a>
          <a className="cursor-pointer rounded-full px-4 py-2 text-sm font-light text-white hover:underline">
            Careers
          </a>
        </div>
        <div className="w-1/3"></div>
      </nav>
      <main className="flex h-full flex-1 flex-col pt-24">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
