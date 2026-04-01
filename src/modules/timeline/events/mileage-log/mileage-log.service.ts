import { Injectable } from '@nestjs/common';

import { MileageLog, MileageSource, Prisma } from '@prisma/client';

import { VehicleService } from '@modules/vehicle/vehicle.service';

import { MileageLogRepository } from './mileage-log.repository';

@Injectable()
export class MileageLogService {
  constructor(
    private readonly mileageLogRepository: MileageLogRepository,
    private readonly vehicleService: VehicleService,
  ) {}

  async recordMileage(
    vehicleId: string,
    mileage: number,
    source: MileageSource,
    eventId: string,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    await Promise.all([
      this.vehicleService.updateCurrentMileage(vehicleId, mileage, tx),
      this.mileageLogRepository.create({ vehicleId, mileage, source, eventId }, tx),
    ]);
  }

  async findAllByVehicleId(vehicleId: string): Promise<MileageLog[]> {
    return this.mileageLogRepository.findAllByVehicleId(vehicleId);
  }
}
