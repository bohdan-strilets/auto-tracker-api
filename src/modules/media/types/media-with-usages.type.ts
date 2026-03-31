import { Media, MediaUsage } from '@prisma/client';

export type MediaWithUsages = Media & {
  mediaUsages: MediaUsage[];
};
