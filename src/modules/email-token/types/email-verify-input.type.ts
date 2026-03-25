export type EmailVerifyInput = {
  userId: string;
  email: string;
  tokenHash: string;
  expiresAt: Date;
};
