import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { AuthModule } from '@modules/auth/auth.module';
import { AuthCredentialsModule } from '@modules/auth-credentials/auth-credentials.module';
import { EmailTokenModule } from '@modules/email-token/email-token.module';
import { OAuthModule } from '@modules/oauth/oauth.module';
import { SessionModule } from '@modules/session/session.module';
import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { AuthGuardModule } from '@common/auth/auth.module';
import { CookieModule } from '@common/cookie/cookie.module';
import { CryptoModule } from '@common/crypto/crypto.module';
import { DeviceModule } from '@common/device/device.module';
import { MailModule } from '@common/mail/mail.module';
import { ThrottlerConfigModule } from '@common/throttler/throttler.module';

import { ConfigModule } from '@config/config.module';

import { PrismaModule } from './db';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    CryptoModule,
    UserModule,
    AuthCredentialsModule,
    OAuthModule,
    EmailTokenModule,
    SessionModule,
    MailModule,
    AuthModule,
    DeviceModule,
    CookieModule,
    AuthGuardModule,
    ThrottlerConfigModule,
    WorkspaceModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
