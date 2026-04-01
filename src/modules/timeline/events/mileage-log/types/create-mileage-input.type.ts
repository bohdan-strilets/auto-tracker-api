import { MileageSource } from '@prisma/client';

export type CreateMileageInput = {
  vehicleId: string;
  mileage: number;
  source: MileageSource;
  eventId?: string;
};
