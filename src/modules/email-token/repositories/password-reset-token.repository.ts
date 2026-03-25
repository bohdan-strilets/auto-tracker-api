import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { PasswordResetToken } from '@prisma/client';

import { PasswordResetInput } from '../types';

@Injectable()
export class PasswordResetTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: PasswordResetInput): Promise<PasswordResetToken> {
    return this.prisma.passwordResetToken.create({ data: input });
  }

  async findByTokenHash(tokenHash: string): Promise<PasswordResetToken | null> {
    return this.prisma.passwordResetToken.findFirst({ where: { tokenHash } });
  }

  async markAsUsed(id: string): Promise<void> {
    const now = new Date();
    await this.prisma.passwordResetToken.update({
      where: { id },
      data: { usedAt: now },
    });
  }
}
