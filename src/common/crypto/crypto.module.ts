import { Global, Module } from '@nestjs/common';

import { CryptoService, PasswordService, TokenService } from './services';

@Global()
@Module({
  providers: [CryptoService, TokenService, PasswordService],
  exports: [TokenService, PasswordService],
})
export class CryptoModule {}
