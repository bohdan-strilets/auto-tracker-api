import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { VehicleModule } from '@modules/vehicle/vehicle.module';
import { WorkspaceModule } from '@modules/workspace/workspace.module';

import { TireController } from './tire.controller';
import { TireRepository } from './tire.repository';
import { TireService } from './tire.service';

@Module({
  imports: [PrismaModule, WorkspaceModule, VehicleModule],
  controllers: [TireController],
  providers: [TireService, TireRepository],
  exports: [TireService],
})
export class TireModule {}
