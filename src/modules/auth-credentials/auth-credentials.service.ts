import { Injectable } from '@nestjs/common';

import { AuthCredentials, Prisma } from '@prisma/client';

import { minutesToMs } from '@common/date';

import { ConfigService } from '@config/config.service';

import { AuthCredentialsRepository } from './auth-credentials.repository';

@Injectable()
export class AuthCredentialsService {
  constructor(
    private readonly repository: AuthCredentialsRepository,
    private readonly config: ConfigService,
  ) {}

  async create(
    userId: string,
    passwordHash: string,
    tx?: Prisma.TransactionClient,
  ): Promise<AuthCredentials> {
    return this.repository.create(userId, passwordHash, tx);
  }

  async findByUserId(userId: string): Promise<AuthCredentials | null> {
    return this.repository.findByUserId(userId);
  }

  async updatePassword(userId: string, passwordHash: string): Promise<AuthCredentials> {
    return this.repository.updatePassword(userId, passwordHash);
  }

  async handleFailedLogin(userId: string): Promise<void> {
    await this.repository.incrementFailedAttempts(userId);

    const credentials = await this.repository.findByUserId(userId);
    if (!credentials) return;

    if (credentials.failedLoginAttempts >= this.config.authMaxFailedAttempts) {
      const now = new Date().getTime();
      const authLockDurationMinutes = this.config.authLockDurationMinutes;
      const lockedUntil = new Date(now + minutesToMs(authLockDurationMinutes));
      await this.repository.lockAccount(userId, lockedUntil);
    }
  }

  async handleSuccessfulLogin(userId: string): Promise<void> {
    await this.repository.resetFailedAttempts(userId);
  }

  async markPasswordResetRequired(userId: string): Promise<void> {
    await this.repository.markPasswordResetRequired(userId);
  }

  isLocked(lockedUntil: Date | null): boolean {
    return this.repository.isLocked(lockedUntil);
  }
}
