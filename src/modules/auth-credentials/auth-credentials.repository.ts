import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { AuthCredentials } from '@prisma/client';

@Injectable()
export class AuthCredentialsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, passwordHash: string): Promise<AuthCredentials> {
    const now = new Date();

    return this.prisma.authCredentials.create({
      data: {
        userId,
        passwordHash,
        passwordChangedAt: now,
        passwordResetRequired: false,
      },
    });
  }

  async findByUserId(userId: string): Promise<AuthCredentials | null> {
    return this.prisma.authCredentials.findUnique({ where: { userId } });
  }

  async updatePassword(userId: string, passwordHash: string): Promise<AuthCredentials> {
    return this.prisma.authCredentials.update({
      where: { userId },
      data: {
        passwordHash,
        passwordChangedAt: new Date(),
        passwordResetRequired: false,
      },
    });
  }

  async incrementFailedAttempts(userId: string): Promise<void> {
    const now = new Date();

    await this.prisma.authCredentials.update({
      where: { userId },
      data: {
        failedLoginAttempts: { increment: 1 },
        lastFailedLoginAt: now,
      },
    });
  }

  async resetFailedAttempts(userId: string): Promise<void> {
    await this.prisma.authCredentials.update({
      where: { userId },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastFailedLoginAt: null,
      },
    });
  }

  async lockAccount(userId: string, lockedUntil: Date): Promise<void> {
    await this.prisma.authCredentials.update({
      where: { userId },
      data: { lockedUntil },
    });
  }

  async markPasswordResetRequired(userId: string): Promise<void> {
    await this.prisma.authCredentials.update({
      where: { userId },
      data: { passwordResetRequired: true },
    });
  }

  isLocked(lockedUntil: Date | null): boolean {
    const now = new Date();
    if (lockedUntil === null) return false;
    return now < lockedUntil;
  }
}
