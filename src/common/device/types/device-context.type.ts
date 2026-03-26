import { DeviceType } from '@prisma/client';

export type DeviceContext = {
  deviceType: DeviceType;
  deviceName: string | null;
  deviceOS: string | null;
  deviceBrowser: string | null;
  ipAddress: string;
  userAgent: string;
  country: string | null;
  city: string | null;
};
