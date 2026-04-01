import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, TireChange } from '@prisma/client';

@Injectable()
export class TireChangeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEventId(eventId: string, tx?: Prisma.TransactionClient): Promise<TireChange | null> {
    const client = tx ?? this.prisma;
    return client.tireChange.findUnique({ where: { eventId } });
  }

  async create(
    data: {
      eventId: string;
      tireId: string;
      installedDate: Date;
      installedMileage: number;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<TireChange> {
    const client = tx ?? this.prisma;
    return client.tireChange.create({ data });
  }

  async update(
    eventId: string,
    data: Prisma.TireChangeUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<TireChange> {
    const client = tx ?? this.prisma;
    return client.tireChange.update({ where: { eventId }, data });
  }

  async findActiveByTireId(
    tireId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<TireChange | null> {
    const client = tx ?? this.prisma;
    return client.tireChange.findFirst({
      where: { tireId, removedDate: null },
    });
  }
}
