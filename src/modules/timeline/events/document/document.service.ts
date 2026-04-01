import { Injectable } from '@nestjs/common';

import { TimelineEvent, TimelineEventType } from '@prisma/client';

import { TimelineService } from '@modules/timeline/timeline.service';

import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(private readonly timelineService: TimelineService) {}

  async create(vehicleId: string, dto: CreateDocumentDto): Promise<TimelineEvent> {
    return this.timelineService.createEvent(
      vehicleId,
      {
        type: TimelineEventType.DOCUMENT,
        title: dto.title ?? dto.type,
        eventDate: dto.issueDate ?? new Date(),
        mileage: dto.mileage,
        cost: dto.cost,
        currency: dto.currency,
        description: dto.description,
      },
      async (eventId, tx) => {
        await tx.document.create({
          data: {
            eventId,
            type: dto.type,
            issueDate: dto.issueDate,
            expireDate: dto.expireDate,
            notes: dto.notes,
          },
        });
      },
    );
  }
}
