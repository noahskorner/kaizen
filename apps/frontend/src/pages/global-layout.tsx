import { ToastManager } from '@kaizen/core-client';

export interface GlobalLayoutProps {
  children: React.ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="font-primary flex h-screen w-screen flex-col items-center overflow-auto bg-white text-neutral-950">
      <ToastManager />
      <div className="w-full">{children}</div>
    </div>
  );
};
