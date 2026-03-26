import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { RegistrationSource, UserStatus } from '@prisma/client';

import { AuthCredentialsService } from '@modules/auth-credentials/auth-credentials.service';
import { EmailTokenService } from '@modules/email-token/email-token.service';
import { JwtTokenService } from '@modules/session/services';
import { SessionService } from '@modules/session/services/session.service';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  RefreshTokenResponse,
} from '@modules/session/types';
import { CreateUserInput } from '@modules/user/types';
import { toUserResponseDto } from '@modules/user/user.mapper';
import { UserService } from '@modules/user/user.service';

import { PasswordService } from '@common/crypto/services';
import { DeviceContext } from '@common/device/types';
import {
  AccountLockedException,
  AccountSuspendedException,
  EmailAlreadyExistsException,
  InvalidCredentialsException,
  WeakPasswordException,
} from '@common/exceptions';
import { MailService } from '@common/mail/mail.service';

import { LoginDto, RegisterDto } from './dto';
import { RegisterOutput } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly authCredentialsService: AuthCredentialsService,
    private readonly emailTokenService: EmailTokenService,
    private readonly sessionService: SessionService,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async register(dto: RegisterDto, deviceContext: DeviceContext): Promise<RegisterOutput> {
    const emailExists = await this.userService.emailExists(dto.email);
    if (emailExists) throw new EmailAlreadyExistsException();

    const isPasswordStrong = this.passwordService.isStrong(dto.password);
    if (!isPasswordStrong) throw new WeakPasswordException();

    const passwordHash = await this.passwordService.hash(dto.password);

    const user = await this.prisma.$transaction(async (tx) => {
      const userInput: CreateUserInput = {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        locale: dto.locale,
        timezone: dto.timezone,
        registrationSource: RegistrationSource.EMAIL,
      };

      const createdUser = await this.userService.create(userInput, tx);
      await this.authCredentialsService.create(createdUser.id, passwordHash, tx);

      return createdUser;
    });

    await this.userService.handleSuccessfulLogin(user.id);

    const { rawToken } = await this.emailTokenService.createEmailVerificationToken(
      user.id,
      user.email,
    );

    await this.mailService.sendVerificationEmail(user.email, user.firstName, rawToken);

    const sessionId = this.sessionService.generateSessionId();
    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      sid: sessionId,
      email: user.email,
    };

    const { accessToken, refreshToken, session } = await this.sessionService.create(
      { ...deviceContext, userId: user.id, id: sessionId },
      accessTokenPayload,
    );
    const refreshTokenExpiresAt = session.expiresAt;
    const userResponse = toUserResponseDto(user);

    return { user: userResponse, accessToken, refreshToken, refreshTokenExpiresAt };
  }

  async login(dto: LoginDto, deviceContext: DeviceContext): Promise<RegisterOutput> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new InvalidCredentialsException();

    if (user.status === UserStatus.SUSPENDED) {
      throw new AccountSuspendedException();
    }
    if (user.status === UserStatus.DELETED) {
      throw new InvalidCredentialsException();
    }

    const credentials = await this.authCredentialsService.findByUserId(user.id);
    if (!credentials) throw new InvalidCredentialsException();

    if (this.authCredentialsService.isLocked(credentials.lockedUntil)) {
      throw new AccountLockedException();
    }

    const isPasswordValid = await this.passwordService.verify(
      credentials.passwordHash,
      dto.password,
    );

    if (!isPasswordValid) {
      await this.authCredentialsService.handleFailedLogin(user.id);

      const updatedCredentials = await this.authCredentialsService.findByUserId(user.id);
      if (
        updatedCredentials &&
        this.authCredentialsService.isLocked(updatedCredentials.lockedUntil)
      ) {
        await this.mailService.sendAccountLockedEmail(
          user.email,
          user.firstName,
          updatedCredentials.lockedUntil?.toISOString() ?? '',
        );
        throw new AccountLockedException();
      }

      throw new InvalidCredentialsException();
    }

    await this.authCredentialsService.handleSuccessfulLogin(user.id);
    await this.userService.handleSuccessfulLogin(user.id);

    const sessionId = this.sessionService.generateSessionId();
    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      sid: sessionId,
      email: user.email,
    };

    const { accessToken, refreshToken, session } = await this.sessionService.create(
      { ...deviceContext, userId: user.id, id: sessionId },
      accessTokenPayload,
    );

    const userResponse = toUserResponseDto(user);

    return {
      user: userResponse,
      accessToken,
      refreshToken,
      refreshTokenExpiresAt: session.expiresAt,
    };
  }

  async logout(rawRefreshToken: string): Promise<void> {
    let payload: RefreshTokenPayload;

    try {
      payload = this.jwtTokenService.verifyRefreshToken(rawRefreshToken);
    } catch {
      return;
    }

    await this.sessionService.revoke(payload.sid);
  }

  async logoutAll(rawRefreshToken: string): Promise<void> {
    let payload: RefreshTokenPayload;

    try {
      payload = this.jwtTokenService.verifyRefreshToken(rawRefreshToken);
    } catch {
      return;
    }

    await this.sessionService.revokeAll(payload.sub);
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (!user) return;
    if (user.emailVerified) return;

    const { rawToken } = await this.emailTokenService.resendEmailVerificationToken(
      user.id,
      user.email,
    );

    await this.mailService.sendVerificationEmail(user.email, user.firstName, rawToken);
  }

  async verifyEmail(rawToken: string): Promise<void> {
    const token = await this.emailTokenService.useEmailVerificationToken(rawToken);
    await this.userService.markEmailAsVerified(token.userId);

    const user = await this.userService.getById(token.userId);
    await this.mailService.sendWelcomeEmail(user.email, user.firstName);
  }

  async refresh(rawRefreshToken: string | null): Promise<RefreshTokenResponse> {
    if (!rawRefreshToken) throw new UnauthorizedException();
    return this.sessionService.refresh(rawRefreshToken);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (!user) return;
    if (user.status !== UserStatus.ACTIVE) return;

    const { rawToken } = await this.emailTokenService.createPasswordResetToken(user.id);
    await this.mailService.sendPasswordResetEmail(user.email, user.firstName, rawToken);
  }

  async resetPassword(rawToken: string, newPassword: string): Promise<void> {
    if (!this.passwordService.isStrong(newPassword)) {
      throw new WeakPasswordException();
    }

    const token = await this.emailTokenService.usePasswordResetToken(rawToken);

    const passwordHash = await this.passwordService.hash(newPassword);
    await this.authCredentialsService.updatePassword(token.userId, passwordHash);

    await this.sessionService.revokeAll(token.userId);

    const user = await this.userService.getById(token.userId);
    await this.mailService.sendPasswordChangedEmail(
      user.email,
      user.firstName,
      new Date().toISOString(),
    );
  }
}
