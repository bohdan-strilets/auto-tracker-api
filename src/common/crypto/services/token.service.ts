import { Injectable } from '@nestjs/common';

import { minutesToMs } from '@common/date';

import { GenerateTokenResult } from '../types';

import { CryptoService } from './crypto.service';

@Injectable()
export class TokenService {
  constructor(private readonly crypto: CryptoService) {}

  private calculateExpiresAt(expiresInMinutes: number): Date {
    const now = new Date();
    const ms = minutesToMs(expiresInMinutes);

    return new Date(now.getTime() + ms);
  }

  generate(expiresInMinutes = 60): GenerateTokenResult {
    const rawToken = this.crypto.generateRandomHex();
    const tokenHash = this.crypto.hashSha256(rawToken);
    const expiresAt = this.calculateExpiresAt(expiresInMinutes);

    return { rawToken, tokenHash, expiresAt };
  }

  hash(rawToken: string): string {
    return this.crypto.hashSha256(rawToken);
  }

  isExpired(expiresAt: Date): boolean {
    const now = new Date();
    return now > expiresAt;
  }

  isUsed(usedAt: Date | null): boolean {
    return usedAt !== null;
  }
}
