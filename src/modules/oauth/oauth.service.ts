import { Injectable } from '@nestjs/common';

import { OAuthAccount } from '@prisma/client';

import { OAuthRepository } from './oauth.repository';
import { CreateOAuthAccountInput, UpdateOAuthTokensInput } from './types';

@Injectable()
export class OAuthService {
  constructor(private readonly repository: OAuthRepository) {}

  async findByProviderUserId(providerUserId: string): Promise<OAuthAccount | null> {
    return this.repository.findByProviderUserId(providerUserId);
  }

  async findAllByUserId(userId: string): Promise<OAuthAccount[]> {
    return this.repository.findAllByUserId(userId);
  }

  async create(input: CreateOAuthAccountInput): Promise<OAuthAccount> {
    return this.repository.create(input);
  }

  async updateTokens(id: string, input: UpdateOAuthTokensInput): Promise<OAuthAccount> {
    return this.repository.updateTokens(id, input);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
