import { Module } from '@nestjs/common';

import { UserRepository, UserSettingsRepository } from './repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserSettingsRepository],
  exports: [UserService],
})
export class UserModule {}
