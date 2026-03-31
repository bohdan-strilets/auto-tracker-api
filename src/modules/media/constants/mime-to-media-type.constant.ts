import { MediaType } from '@prisma/client';

export const MIME_TO_MEDIA_TYPE: Record<string, MediaType> = {
  'image/jpeg': MediaType.IMAGE,
  'image/png': MediaType.IMAGE,
  'video/mp4': MediaType.VIDEO,
  'application/pdf': MediaType.DOCUMENT,
};
