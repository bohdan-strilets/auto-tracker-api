import { Currency, DateFormat, DistanceUnit, FuelUnit, Language, Theme } from '@prisma/client';

export type UpdateUserSettingsInput = {
  currency?: Currency;
  language?: Language;
  distanceUnit?: DistanceUnit;
  fuelUnit?: FuelUnit;
  theme?: Theme;
  dateFormat?: DateFormat;
  notificationsEmail?: boolean;
  notificationsPush?: boolean;
};
