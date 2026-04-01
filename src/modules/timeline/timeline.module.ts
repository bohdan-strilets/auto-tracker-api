import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { TireModule } from '@modules/tire/tire.module';
import { VehicleModule } from '@modules/vehicle/vehicle.module';
import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { DocumentController, DocumentService } from './events/document';
import { ExpenseController, ExpenseService } from './events/expense';
import { FuelLogController, FuelLogService } from './events/fuel-log';
import { MileageLogModule } from './events/mileage-log';
import { PurchaseController, PurchaseService } from './events/purchase';
import { SaleController, SaleService } from './events/sale';
import { ServiceLogController, ServiceLogService } from './events/service-log';
import {
  TireChangeController,
  TireChangeRepository,
  TireChangeService,
} from './events/tire-change';
import { TimelineController } from './timeline.controller';
import { TimelineRepository } from './timeline.repository';
import { TimelineService } from './timeline.service';

@Module({
  imports: [PrismaModule, WorkspaceModule, VehicleModule, MileageLogModule, TireModule],
  controllers: [
    TimelineController,
    FuelLogController,
    ServiceLogController,
    ExpenseController,
    PurchaseController,
    SaleController,
    TireChangeController,
    DocumentController,
  ],
  providers: [
    TimelineService,
    TimelineRepository,
    FuelLogService,
    ServiceLogService,
    ExpenseService,
    PurchaseService,
    SaleService,
    TireChangeService,
    TireChangeRepository,
    DocumentService,
  ],
  exports: [TimelineService],
})
export class TimelineModule {}
