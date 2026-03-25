import { Module } from '@nestjs/common';

import { OAuthRepository } from './oauth.repository';
import { OAuthService } from './oauth.service';

@Module({
  providers: [OAuthService, OAuthRepository],
  exports: [OAuthService],
})
export class OAuthModule {}
