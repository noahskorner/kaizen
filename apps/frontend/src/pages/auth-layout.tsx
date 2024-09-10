import { termsAndConditions } from './terms-and-conditions';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="font-primary flex h-screen w-screen flex-col items-center overflow-auto bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 xl:items-start">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 border-r border-zinc-700 bg-zinc-50 px-8 dark:bg-zinc-900 xl:max-w-[37.5%]">
        <div className="flex h-full w-full max-w-sm flex-col items-stretch">
          <div className="h-full"></div>
          {children}
          <div className="flex h-full items-end pb-4">
            <p className="text-center text-xs text-muted-foreground">
              {termsAndConditions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
