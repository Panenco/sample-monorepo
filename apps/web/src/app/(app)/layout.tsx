'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

// Every page inside the (app) folder requires a logged-in user and gets this header.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace('/login');
  }, [isPending, session, router]);

  if (!session) {
    return <p className="p-8 text-sm text-slate-500">Loading…</p>;
  }

  async function handleLogout() {
    await authClient.signOut();
    router.replace('/login');
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="font-semibold">Starter app</span>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-600">Signed in as {session.user.name}</span>
            <button onClick={handleLogout} className="rounded-md px-3 py-1.5 hover:bg-slate-100">
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
    </div>
  );
}
