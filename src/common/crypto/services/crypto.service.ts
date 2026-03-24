import { createHash, randomBytes } from 'crypto';

import { Injectable } from '@nestjs/common';

import * as argon2 from 'argon2';

import { ConfigService } from '@config/config.service';

@Injectable()
export class CryptoService {
  private readonly ARGON2_OPTIONS: argon2.Options;

  constructor(private readonly config: ConfigService) {
    this.ARGON2_OPTIONS = {
      type: argon2.argon2id,
      memoryCost: this.config.argon2MemoryCost,
      timeCost: this.config.argon2TimeCost,
      parallelism: this.config.argon2Parallelism,
    };
  }

  private toPepper(value: string): string {
    const pepper = this.config.argon2Pepper;
    return value + pepper;
  }

  async hashArgon2(value: string): Promise<string> {
    try {
      const peppered = this.toPepper(value);
      return await argon2.hash(peppered, this.ARGON2_OPTIONS);
    } catch {
      throw new Error('Failed to hash value with Argon2');
    }
  }

  async verifyArgon2(hashValue: string, value: string): Promise<boolean> {
    try {
      const peppered = this.toPepper(value);
      return await argon2.verify(hashValue, peppered);
    } catch {
      return false;
    }
  }

  hashSha256(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  generateRandomHex(byteLength = 32): string {
    return randomBytes(byteLength).toString('hex');
  }
}
