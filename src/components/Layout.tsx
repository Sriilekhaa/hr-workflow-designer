import type { ReactNode } from 'react';
import React from 'react';
import { Sidebar } from './Sidebar';
import { TopAppBar } from './TopAppBar';

interface LayoutProps {
  children: ReactNode;
  noScroll?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, noScroll }) => {
  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-body-md overflow-hidden">
      <Sidebar />
      <TopAppBar />
      <main className={`ml-[260px] pt-16 h-screen flex flex-col relative ${noScroll ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {children}
      </main>
    </div>
  );
};
