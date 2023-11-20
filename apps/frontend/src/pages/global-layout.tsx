export interface GlobalLayoutProps {
  children: React.ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="h-screen w-screen bg-slate-900 text-white">{children}</div>
  );
};
