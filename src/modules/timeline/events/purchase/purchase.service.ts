import { Injectable } from '@nestjs/common';

import { MileageSource, TimelineEvent, TimelineEventType } from '@prisma/client';

import { TimelineService } from '@modules/timeline/timeline.service';
import { VehicleService } from '@modules/vehicle/vehicle.service';

import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly timelineService: TimelineService,
    private readonly vehicleService: VehicleService,
  ) {}

  async create(vehicleId: string, dto: CreatePurchaseDto): Promise<TimelineEvent> {
    return this.timelineService.createEvent(
      vehicleId,
      {
        type: TimelineEventType.PURCHASE,
        title: dto.title ?? 'Vehicle purchase',
        eventDate: dto.eventDate,
        mileage: dto.mileage,
        mileageSource: MileageSource.PURCHASE,
        cost: dto.cost,
        currency: dto.currency,
        description: dto.description,
      },
      async (eventId, tx) => {
        await this.vehicleService.updatePurchaseInfo(
          vehicleId,
          {
            purchaseDate: dto.eventDate,
            purchasePrice: dto.cost,
            purchaseMileage: dto.mileage,
          },
          tx,
        );
      },
    );
  }
}
