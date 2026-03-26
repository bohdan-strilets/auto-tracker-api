import { Injectable } from '@nestjs/common';

import { EmailChangeToken, EmailVerificationToken, PasswordResetToken } from '@prisma/client';

import { TokenService } from '@common/crypto/services';
import { normalizeEmail } from '@common/email';
import {
  TokenAlreadyUsedException,
  TokenExpiredException,
  TokenNotFoundException,
} from '@common/exceptions';

import { ConfigService } from '@config/config.service';

import {
  EmailChangeTokenRepository,
  EmailVerifyTokenRepository,
  PasswordResetTokenRepository,
} from './repositories';
import {
  EmailChangeInput,
  EmailChangeOutput,
  EmailVerifyInput,
  EmailVerifyOutput,
  PasswordResetInput,
  PasswordResetOutput,
} from './types';

@Injectable()
export class EmailTokenService {
  private readonly emailVerifyExpiresMinutes: number;
  private readonly emailChangeExpiresMinutes: number;
  private readonly passwordResetExpiresMinutes: number;

  constructor(
    private readonly emailVerifyTokenRepository: EmailVerifyTokenRepository,
    private readonly emailChangeTokenRepository: EmailChangeTokenRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    this.emailVerifyExpiresMinutes = this.configService.tokenEmailVerifyExpiresMinutes;
    this.emailChangeExpiresMinutes = this.configService.tokenEmailChangeExpiresMinutes;
    this.passwordResetExpiresMinutes = this.configService.tokenPasswordResetExpiresMinutes;
  }
  // ─── Helper Methods ──────────────────────────────────────────────────

  private validateToken(
    token: EmailVerificationToken | EmailChangeToken | PasswordResetToken | null,
  ): asserts token is EmailVerificationToken | EmailChangeToken | PasswordResetToken {
    if (!token) throw new TokenNotFoundException();

    if (this.tokenService.isUsed(token.usedAt)) throw new TokenAlreadyUsedException();

    if (this.tokenService.isExpired(token.expiresAt)) throw new TokenExpiredException();
  }

  // ─── Email Verification ──────────────────────────────────────────────

  async createEmailVerificationToken(userId: string, email: string): Promise<EmailVerifyOutput> {
    const expiresMinutes = this.emailVerifyExpiresMinutes;
    const { rawToken, tokenHash, expiresAt } = this.tokenService.generate(expiresMinutes);

    const input: EmailVerifyInput = {
      email: normalizeEmail(email),
      userId,
      tokenHash,
      expiresAt,
    };

    const record = await this.emailVerifyTokenRepository.create(input);
    return { rawToken, record };
  }

  async findEmailVerificationToken(rawToken: string): Promise<EmailVerificationToken | null> {
    const tokenHash = this.tokenService.hash(rawToken);
    return this.emailVerifyTokenRepository.findByTokenHash(tokenHash);
  }

  async useEmailVerificationToken(rawToken: string): Promise<EmailVerificationToken> {
    const token = await this.findEmailVerificationToken(rawToken);
    this.validateToken(token);

    await this.emailVerifyTokenRepository.markAsUsed(token.id);
    return token;
  }

  async resendEmailVerificationToken(
    userId: string,
    email: string,
  ): Promise<{ rawToken: string; record: EmailVerificationToken }> {
    await this.emailVerifyTokenRepository.deleteAllByUserId(userId);
    return this.createEmailVerificationToken(userId, email);
  }

  // ─── Email Change ────────────────────────────────────────────────────

  async createEmailChangeToken(userId: string, newEmail: string): Promise<EmailChangeOutput> {
    await this.emailChangeTokenRepository.deleteAllByUserId(userId);

    const expiresMinutes = this.emailChangeExpiresMinutes;
    const { rawToken, tokenHash, expiresAt } = this.tokenService.generate(expiresMinutes);

    const input: EmailChangeInput = {
      newEmail: normalizeEmail(newEmail),
      userId,
      tokenHash,
      expiresAt,
    };

    const record = await this.emailChangeTokenRepository.create(input);
    return { rawToken, record };
  }

  async findEmailChangeToken(rawToken: string): Promise<EmailChangeToken | null> {
    const tokenHash = this.tokenService.hash(rawToken);
    return this.emailChangeTokenRepository.findByTokenHash(tokenHash);
  }

  async useEmailChangeToken(rawToken: string): Promise<EmailChangeToken> {
    const token = await this.findEmailChangeToken(rawToken);
    this.validateToken(token);

    await this.emailChangeTokenRepository.markAsUsed(token.id);
    return token;
  }

  // ─── Password Reset ──────────────────────────────────────────────────

  async createPasswordResetToken(userId: string): Promise<PasswordResetOutput> {
    const expiresMinutes = this.passwordResetExpiresMinutes;
    const { rawToken, tokenHash, expiresAt } = this.tokenService.generate(expiresMinutes);

    const input: PasswordResetInput = {
      userId,
      expiresAt,
      tokenHash,
    };

    const record = await this.passwordResetTokenRepository.create(input);
    return { rawToken, record };
  }

  async findPasswordResetToken(rawToken: string): Promise<PasswordResetToken | null> {
    const tokenHash = this.tokenService.hash(rawToken);
    return this.passwordResetTokenRepository.findByTokenHash(tokenHash);
  }

  async usePasswordResetToken(rawToken: string): Promise<PasswordResetToken> {
    const token = await this.findPasswordResetToken(rawToken);
    this.validateToken(token);

    await this.passwordResetTokenRepository.markAsUsed(token.id);
    return token;
  }
}
