import { Module } from '@nestjs/common';

import { AuthCredentialsRepository } from './auth-credentials.repository';
import { AuthCredentialsService } from './auth-credentials.service';

@Module({
  providers: [AuthCredentialsService, AuthCredentialsRepository],
  exports: [AuthCredentialsService],
})
export class AuthCredentialsModule {}
