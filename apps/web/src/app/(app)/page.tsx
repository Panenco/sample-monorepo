'use client';

import { meControllerGetMe, type MeDtoOutput } from '@app/api-sdk';
import { useEffect, useState } from 'react';
import { AddingAFeature } from '@/features/home/adding-a-feature';
import { EverydayCommands } from '@/features/home/everyday-commands';
import { HowItFits } from '@/features/home/how-it-fits';
import { SkillsOverview } from '@/features/home/skills-overview';
import { UsefulLinks } from '@/features/home/useful-links';
import { WhatsInTheBox } from '@/features/home/whats-in-the-box';
import { apiClient } from '@/lib/api-client';

export default function HomePage() {
  const [me, setMe] = useState<MeDtoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    meControllerGetMe({ client: apiClient, throwOnError: true })
      .then(({ data }) => setMe(data))
      .catch(() => setError('Could not load your profile from the API.'));
  }, []);

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Welcome{me ? `, ${me.name}` : ''}</h1>
        <p className="max-w-2xl text-slate-600">
          This is the starting point for your product. Login, the database, the API and this website
          already work, so you can spend your time on the features that make your product special.
          This page explains how the project is organised.
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </section>
      <HowItFits />
      <WhatsInTheBox />
      <AddingAFeature />
      <SkillsOverview />
      <EverydayCommands />
      <UsefulLinks />
    </div>
  );
}
