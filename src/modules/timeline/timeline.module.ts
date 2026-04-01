import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { VehicleModule } from '@modules/vehicle/vehicle.module';
import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { ExpenseController, ExpenseService } from './events/expense';
import { FuelLogController, FuelLogService } from './events/fuel-log';
import { PurchaseController, PurchaseService } from './events/purchase';
import { ServiceLogController, ServiceLogService } from './events/service-log';
import { TimelineController } from './timeline.controller';
import { TimelineRepository } from './timeline.repository';
import { TimelineService } from './timeline.service';

@Module({
  imports: [PrismaModule, WorkspaceModule, VehicleModule],
  controllers: [
    TimelineController,
    FuelLogController,
    ServiceLogController,
    ExpenseController,
    PurchaseController,
  ],
  providers: [
    TimelineService,
    TimelineRepository,
    FuelLogService,
    ServiceLogService,
    ExpenseService,
    PurchaseService,
  ],
  exports: [TimelineService],
})
export class TimelineModule {}
