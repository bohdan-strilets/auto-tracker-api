import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Global()
@Module({
  imports: [PassportModule],
  providers: [
    JwtAccessStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthGuardModule {}
