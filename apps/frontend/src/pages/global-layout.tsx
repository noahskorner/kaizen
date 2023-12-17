export interface GlobalLayoutProps {
  children: React.ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="font-primary h-screen w-screen overflow-auto bg-white text-neutral-950">
      {children}
    </div>
  );
};
