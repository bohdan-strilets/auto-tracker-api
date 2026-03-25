import { Module } from '@nestjs/common';

import { EmailTokenService } from './email-token.service';
import {
  EmailChangeTokenRepository,
  EmailVerifyTokenRepository,
  PasswordResetTokenRepository,
} from './repositories';

@Module({
  providers: [
    EmailChangeTokenRepository,
    EmailVerifyTokenRepository,
    PasswordResetTokenRepository,
    EmailTokenService,
  ],
  exports: [EmailTokenService],
})
export class EmailTokenModule {}
