import { Prisma } from '@prisma/client';

export const memberUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
} satisfies Prisma.UserSelect;
