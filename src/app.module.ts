import { Module } from '@nestjs/common';

import { CryptoModule } from '@common/crypto/crypto.module';

import { ConfigModule } from '@config/config.module';

import { PrismaModule } from './db';

@Module({
  imports: [PrismaModule, ConfigModule, CryptoModule],
})
export class AppModule {}
