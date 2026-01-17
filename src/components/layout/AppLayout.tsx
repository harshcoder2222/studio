import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
