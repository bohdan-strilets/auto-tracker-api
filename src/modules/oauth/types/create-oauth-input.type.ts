import { Provider } from '@prisma/client';

export type CreateOAuthAccountInput = {
  userId: string;
  provider: Provider;
  providerUserId: string;
  email?: string;
  providerAccessToken?: string;
  providerRefreshToken?: string;
};
