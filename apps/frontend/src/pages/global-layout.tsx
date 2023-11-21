export interface GlobalLayoutProps {
  children: React.ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="font-primary h-screen w-screen bg-gray-950 text-white">
      {children}
    </div>
  );
};
