import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { VehicleModule } from '@modules/vehicle/vehicle.module';
import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { FuelLogController, FuelLogService } from './events/fuel-log';
import { TimelineController } from './timeline.controller';
import { TimelineRepository } from './timeline.repository';
import { TimelineService } from './timeline.service';

@Module({
  imports: [PrismaModule, WorkspaceModule, VehicleModule],
  controllers: [TimelineController, FuelLogController],
  providers: [TimelineService, TimelineRepository, FuelLogService],
  exports: [TimelineService],
})
export class TimelineModule {}
