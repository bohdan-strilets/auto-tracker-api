import { PasswordResetToken } from '@prisma/client';

export type PasswordResetOutput = {
  rawToken: string;
  record: PasswordResetToken;
};
