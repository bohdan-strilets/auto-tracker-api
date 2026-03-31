import { Media } from '@prisma/client';

import { MediaUrls } from './media-urls.type';

export type MediaWithUrls = Media & { urls: MediaUrls };
