import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, TimelineEvent } from '@prisma/client';

import { PaginatedData, SortOrder } from '@common/pagination';

import { TimelineEventQueryParams, TimelineEventWithDetails } from './types';

@Injectable()
export class TimelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ──────────────────────────────────────────────────────────────

  private readonly includes = {
    fuelLogs: true,
    serviceLogs: true,
    documents: true,
    expenses: true,
    tireChanges: true,
    trips: true,
  } satisfies Prisma.TimelineEventInclude;

  // ──────────────────────────────────────────────────────────────

  async findAllByVehicleId(
    vehicleId: string,
    params: TimelineEventQueryParams,
    tx?: Prisma.TransactionClient,
  ): Promise<PaginatedData<TimelineEventWithDetails>> {
    const client = tx ?? this.prisma;
    const { type, sortOrder = SortOrder.DESC, page = 1, limit = 20 } = params;

    const where: Prisma.TimelineEventWhereInput = {
      vehicleId,
      ...(type && { type }),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await client.$transaction([
      client.timelineEvent.findMany({
        where,
        include: this.includes,
        orderBy: { eventDate: sortOrder },
        skip,
        take: limit,
      }),

      client.timelineEvent.count({ where }),
    ]);

    return { data, total };
  }

  async findById(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<TimelineEventWithDetails | null> {
    const client = tx ?? this.prisma;

    return client.timelineEvent.findUnique({
      where: { id },
      include: this.includes,
    });
  }

  async create(
    data: Prisma.TimelineEventCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<TimelineEvent> {
    const client = tx ?? this.prisma;
    return client.timelineEvent.create({ data });
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<TimelineEvent> {
    const client = tx ?? this.prisma;
    return client.timelineEvent.delete({ where: { id } });
  }
}
