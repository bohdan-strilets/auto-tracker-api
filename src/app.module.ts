import { Module } from '@nestjs/common';

import { AuthCredentialsModule } from '@modules/auth-credentials/auth-credentials.module';
import { EmailTokenModule } from '@modules/email-token/email-token.module';
import { OAuthModule } from '@modules/oauth/oauth.module';

import { CryptoModule } from '@common/crypto/crypto.module';

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
  ],
})
export class AppModule {}
