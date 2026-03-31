import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { TimelineModule } from '@modules/timeline/timeline.module';
import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { FuelLogController } from './fuel-log.controller';
import { FuelLogService } from './fuel-log.service';

@Module({
  imports: [PrismaModule, TimelineModule, WorkspaceModule],
  controllers: [FuelLogController],
  providers: [FuelLogService],
  exports: [FuelLogService],
})
export class FuelLogModule {}
