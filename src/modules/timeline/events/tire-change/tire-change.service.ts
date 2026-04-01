import { Injectable } from '@nestjs/common';

import { TimelineEvent, TimelineEventType } from '@prisma/client';

import { TimelineService } from '@modules/timeline/timeline.service';
import { TireService } from '@modules/tire/tire.service';

import { CreateTireChangeDto } from './dto';
import { TireChangeRepository } from './tire-change.repository';

@Injectable()
export class TireChangeService {
  constructor(
    private readonly timelineService: TimelineService,
    private readonly tireService: TireService,
    private readonly tireChangeRepository: TireChangeRepository,
  ) {}

  async install(vehicleId: string, dto: CreateTireChangeDto): Promise<TimelineEvent> {
    await this.tireService.findById(dto.installTireId);

    if (dto.removeTireId) {
      await this.tireService.findById(dto.removeTireId);
    }

    return this.timelineService.createEvent(
      vehicleId,
      {
        type: TimelineEventType.TIRE_CHANGE,
        title: dto.title ?? 'Tire change',
        eventDate: dto.installedDate,
        mileage: dto.installedMileage,
        description: dto.description,
      },
      async (eventId, tx) => {
        await this.tireChangeRepository.create(
          {
            eventId,
            tireId: dto.installTireId,
            installedDate: dto.installedDate,
            installedMileage: dto.installedMileage,
          },
          tx,
        );

        if (dto.removeTireId) {
          const existing = await this.tireChangeRepository.findActiveByTireId(dto.removeTireId, tx);
          if (existing) {
            await this.tireChangeRepository.update(
              existing.eventId,
              {
                removedDate: dto.installedDate,
                removedMileage: dto.installedMileage,
              },
              tx,
            );
          }
        }
      },
    );
  }
}
