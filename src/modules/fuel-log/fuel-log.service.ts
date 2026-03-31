import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { MileageSource, Prisma, TimelineEvent, TimelineEventType } from '@prisma/client';

import { TimelineService } from '@modules/timeline/timeline.service';

import { CreateFuelLogDto } from './dto';

@Injectable()
export class FuelLogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly timelineService: TimelineService,
  ) {}

  async create(vehicleId: string, dto: CreateFuelLogDto): Promise<TimelineEvent> {
    const eventData = {
      type: TimelineEventType.FUEL,
      title: dto.title ?? `Refuel — ${dto.liters}L ${dto.fuelType}`,
      eventDate: dto.eventDate,
      mileage: dto.mileage,
      mileageSource: MileageSource.FUEL,
      cost: dto.cost ?? dto.liters * dto.pricePerLiter,
      currency: dto.currency,
      description: dto.description,
    };

    const createFuelLogDetails = async (
      eventId: string,
      tx: Prisma.TransactionClient,
    ): Promise<void> => {
      await tx.fuelLog.create({
        data: {
          event: { connect: { id: eventId } },
          liters: dto.liters,
          pricePerLiter: dto.pricePerLiter,
          fuelType: dto.fuelType,
          stationName: dto.stationName,
          stationAddress: dto.stationAddress,
          notes: dto.notes,
        },
      });
    };

    return this.timelineService.createEvent(vehicleId, eventData, createFuelLogDetails);
  }
}
