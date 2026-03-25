import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { OAuthAccount } from '@prisma/client';

import { CreateOAuthAccountInput, UpdateOAuthTokensInput } from './types';

@Injectable()
export class OAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProviderUserId(providerUserId: string): Promise<OAuthAccount | null> {
    return this.prisma.oAuthAccount.findUnique({ where: { providerUserId } });
  }

  async findAllByUserId(userId: string): Promise<OAuthAccount[]> {
    return this.prisma.oAuthAccount.findMany({ where: { userId } });
  }

  async create(input: CreateOAuthAccountInput): Promise<OAuthAccount> {
    return this.prisma.oAuthAccount.create({ data: input });
  }

  async updateTokens(id: string, input: UpdateOAuthTokensInput): Promise<OAuthAccount> {
    return this.prisma.oAuthAccount.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.oAuthAccount.delete({ where: { id } });
  }
}
