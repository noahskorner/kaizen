import { Toaster } from '@kaizen/core-client';

export interface GlobalLayoutProps {
  children: React.ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="font-primary flex h-screen w-screen flex-col items-center overflow-auto bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Toaster />
      <div className="w-full">{children}</div>
    </div>
  );
};
