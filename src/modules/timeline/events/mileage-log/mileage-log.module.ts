import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { VehicleModule } from '@modules/vehicle/vehicle.module';

import { MileageLogRepository } from './mileage-log.repository';
import { MileageLogService } from './mileage-log.service';

@Module({
  imports: [PrismaModule, VehicleModule],
  providers: [MileageLogService, MileageLogRepository],
  exports: [MileageLogService],
})
export class MileageLogModule {}
