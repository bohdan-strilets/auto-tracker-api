import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { EmailVerificationToken } from '@prisma/client';

import { EmailVerifyInput } from '../types';

@Injectable()
export class EmailVerifyTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: EmailVerifyInput): Promise<EmailVerificationToken> {
    return this.prisma.emailVerificationToken.create({ data: input });
  }

  async findByTokenHash(tokenHash: string): Promise<EmailVerificationToken | null> {
    return this.prisma.emailVerificationToken.findFirst({
      where: { tokenHash },
    });
  }

  async markAsUsed(id: string): Promise<void> {
    const now = new Date();
    await this.prisma.emailVerificationToken.update({
      where: { id },
      data: { usedAt: now },
    });
  }
}
