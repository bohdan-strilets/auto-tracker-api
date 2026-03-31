import {
  Expense,
  FuelLog,
  ServiceLog,
  TimelineEvent,
  Document as VehicleDocument,
} from '@prisma/client';

export type TimelineEventWithDetails = TimelineEvent & {
  fuelLogs: FuelLog | null;
  serviceLogs: ServiceLog | null;
  documents: VehicleDocument | null;
  expenses: Expense | null;
};
