import { Currency, MileageSource, TimelineEventType } from '@prisma/client';

export type CreateTimelineEventInput = {
  type: TimelineEventType;
  title: string;
  eventDate: Date;
  mileage?: number;
  mileageSource?: MileageSource;
  cost?: number;
  currency?: Currency;
  description?: string;
};
