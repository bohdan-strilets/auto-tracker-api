import { Prisma } from '@prisma/client';

export type CreateDetailsFn = (eventId: string, tx: Prisma.TransactionClient) => Promise<void>;
