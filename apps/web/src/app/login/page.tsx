'use client';

import { useState, type FormEvent } from 'react';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setError(null);

    const { error } = await authClient.signIn.username({
      username: String(form.get('username')),
      password: String(form.get('password')),
    });

    setIsSubmitting(false);
    if (error) {
      setError(error.message ?? 'Login failed. Please try again.');
      return;
    }
    // A full page load, so the app starts with the fresh session instead of a cached empty one.
    window.location.assign('/');
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="text-xl font-semibold">Log in</h1>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Username</span>
          <input name="username" required autoComplete="username" className={INPUT_CLASSES} />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Password</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={INPUT_CLASSES}
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
        <p className="text-center text-xs text-slate-500">Demo account: admin / admin</p>
      </form>
    </main>
  );
}

const INPUT_CLASSES =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none';
