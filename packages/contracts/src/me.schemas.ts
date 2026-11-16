import { z } from 'zod';

export const MeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
});

export type Me = z.infer<typeof MeSchema>;
