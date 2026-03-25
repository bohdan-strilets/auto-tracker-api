import { EmailChangeToken } from '@prisma/client';

export type EmailChangeOutput = {
  rawToken: string;
  record: EmailChangeToken;
};
