import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keystatic CMS · Ateliér Viktor Marek',
  robots: {
    index: false,
    follow: false,
  },
};

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>;
}
