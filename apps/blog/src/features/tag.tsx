import { ReactNode } from 'react';

export interface TagProps {
  children: ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full bg-indigo-700 px-3 py-1 text-xs text-white">
      {children}
    </span>
  );
}
