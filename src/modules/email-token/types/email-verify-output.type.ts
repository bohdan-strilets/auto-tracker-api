import { EmailVerificationToken } from '@prisma/client';

export type EmailVerifyOutput = {
  rawToken: string;
  record: EmailVerificationToken;
};
