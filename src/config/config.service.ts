import { Injectable } from '@nestjs/common';

import { envSchema } from './config.schema';
import { Env } from './config.types';

@Injectable()
export class ConfigService {
  private readonly env: Env;

  constructor() {
    this.env = envSchema.parse(process.env);
  }

  // App
  get port(): number {
    return this.env.PORT;
  }
  get nodeEnv(): string {
    return this.env.NODE_ENV;
  }
  get isProduction(): boolean {
    return this.env.NODE_ENV === 'production';
  }

  // Database
  get databaseUrl(): string {
    return this.env.DATABASE_URL;
  }

  // Argon2
  get argon2MemoryCost(): number {
    return this.env.ARGON2_MEMORY_COST;
  }
  get argon2TimeCost(): number {
    return this.env.ARGON2_TIME_COST;
  }
  get argon2Parallelism(): number {
    return this.env.ARGON2_PARALLELISM;
  }
  get argon2Pepper(): string {
    return this.env.ARGON2_PEPPER;
  }

  // Authentication
  get authMaxFailedAttempts(): number {
    return this.env.AUTH_MAX_FAILED_ATTEMPTS;
  }
  get authLockDurationMinutes(): number {
    return this.env.AUTH_LOCK_DURATION_MINUTES;
  }

  // Email Tokens
  get tokenEmailVerifyExpiresMinutes(): number {
    return this.env.TOKEN_EMAIL_VERIFY_EXPIRES_MINUTES;
  }
  get tokenEmailChangeExpiresMinutes(): number {
    return this.env.TOKEN_EMAIL_CHANGE_EXPIRES_MINUTES;
  }
  get tokenPasswordResetExpiresMinutes(): number {
    return this.env.TOKEN_PASSWORD_RESET_EXPIRES_MINUTES;
  }

  // JWT
  get jwtAccessSecret(): string {
    return this.env.JWT_ACCESS_SECRET;
  }
  get jwtRefreshSecret(): string {
    return this.env.JWT_REFRESH_SECRET;
  }
  get jwtAccessExpiresMinutes(): number {
    return this.env.JWT_ACCESS_EXPIRES_MINUTES;
  }
  get jwtRefreshExpiresDays(): number {
    return this.env.JWT_REFRESH_EXPIRES_DAYS;
  }

  // Resend
  get resendApiKey(): string {
    return this.env.RESEND_API_KEY;
  }
  get mailFromEmail(): string {
    return this.env.MAIL_FROM_EMAIL;
  }
  get appUrl(): string {
    return this.env.APP_URL;
  }

  // Throttling
  get throttleDefaultTtl(): number {
    return this.env.THROTTLE_DEFAULT_TTL;
  }
  get throttleDefaultLimit(): number {
    return this.env.THROTTLE_DEFAULT_LIMIT;
  }
  get throttleAuthTtl(): number {
    return this.env.THROTTLE_AUTH_TTL;
  }
  get throttleAuthLimit(): number {
    return this.env.THROTTLE_AUTH_LIMIT;
  }
}
