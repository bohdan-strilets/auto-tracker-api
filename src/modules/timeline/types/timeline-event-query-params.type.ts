import { TimelineEventType } from '@prisma/client';

import { SortOrder } from '@common/pagination';

export type TimelineEventQueryParams = {
  type?: TimelineEventType;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
};
