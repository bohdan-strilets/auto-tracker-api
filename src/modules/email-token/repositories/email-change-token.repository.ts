import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { EmailChangeToken } from '@prisma/client';

import { EmailChangeInput } from '../types';

@Injectable()
export class EmailChangeTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: EmailChangeInput): Promise<EmailChangeToken> {
    return this.prisma.emailChangeToken.create({ data: input });
  }

  async findByTokenHash(tokenHash: string): Promise<EmailChangeToken | null> {
    return this.prisma.emailChangeToken.findFirst({ where: { tokenHash } });
  }

  async markAsUsed(id: string): Promise<void> {
    const now = new Date();
    await this.prisma.emailChangeToken.update({
      where: { id },
      data: { usedAt: now },
    });
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    await this.prisma.emailChangeToken.deleteMany({
      where: { userId },
    });
  }
}
