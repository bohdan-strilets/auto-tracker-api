export type PasswordResetInput = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
};
