import { TagIcon } from '@kaizen/core-client';
import { Link } from 'react-router-dom';
import { paths } from '../routes';

export const HomePage = () => {
  return (
    <div className="w-full bg-zinc-950">
      <div className="fixed left-0 top-0 flex h-16 w-full items-center justify-center border-b border-zinc-800 bg-zinc-950 bg-opacity-70 backdrop-blur-md">
        <div className="flex w-full max-w-7xl items-center justify-between px-2 xl:px-16">
          <div>
            <div>Logo</div>
            <div>Links</div>
          </div>
          <div className="flex gap-2">
            <Link to={paths.login}>
              <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-1 text-xs font-bold hover:border-zinc-600 hover:bg-zinc-700">
                Login
              </button>
            </Link>
            <Link to={paths.register}>
              <button className="rounded-lg border border-green-700 bg-green-800 px-4 py-1 text-xs font-bold hover:border-green-600 hover:bg-green-700">
                Join now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col gap-8 py-32">
            <h1 className="scroll-m-20 text-center text-4xl font-semibold leading-8 tracking-tight lg:text-6xl">
              Lorem ipsum dolor sit amet.
              <br />
              <span className="text-green-300">Lorem ipsum dolor sit</span>
            </h1>
            <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              saepe similique assumenda sit recusandae maiores enim, odio eos
              rerum iure impedit! Quia delectus dolores totam!
            </p>
            <div className="flex w-full items-center justify-center gap-2">
              <button className="rounded-lg border border-green-700 bg-green-800 px-4 py-2 text-xs font-bold hover:border-green-600 hover:bg-green-700">
                Lorem, ipsum.
              </button>
              <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-bold hover:border-zinc-600 hover:bg-zinc-700">
                Lorem
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 flex flex-col justify-between gap-32 rounded-lg border border-zinc-700 bg-zinc-900 p-6">
              <div className="flex w-52 flex-col">
                <div>
                  <button className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-xs font-bold hover:border-zinc-600 hover:bg-zinc-700">
                    <TagIcon />
                  </button>
                </div>
                <h4 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
                  Lorem
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum
                  aliquid ab obcaecati. Placeat quae sed sequi, earum impedit
                  deleniti fugit!
                </p>
              </div>
              <div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4 text-muted-foreground">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>

                    <small className="text-xs font-medium leading-none">
                      Lorem, ipsum
                    </small>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4 text-muted-foreground">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>

                    <small className="text-xs font-medium leading-none">
                      Lorem ipsum dolor sit.
                    </small>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4 text-muted-foreground">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>

                    <small className="text-xs font-medium leading-none">
                      Lorem, ipsum dolor.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-between gap-32 rounded-lg border border-zinc-700 bg-zinc-900 p-6 lg:col-span-1">
              <div className="flex w-full max-w-64 flex-col items-center">
                <div>
                  <button className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-xs font-bold hover:border-zinc-600 hover:bg-zinc-700">
                    <TagIcon />
                  </button>
                </div>
                <h4 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
                  Lorem
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita, consequuntur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
