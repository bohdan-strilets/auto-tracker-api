export type EmailChangeInput = {
  userId: string;
  newEmail: string;
  tokenHash: string;
  expiresAt: Date;
};
