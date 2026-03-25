import { RegistrationSource } from '@prisma/client';

export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  timezone: string;
  registrationSource: RegistrationSource;
};
