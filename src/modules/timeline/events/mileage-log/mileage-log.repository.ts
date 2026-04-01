import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { MileageLog, Prisma } from '@prisma/client';

import { CreateMileageInput } from './types';

@Injectable()
export class MileageLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMileageInput, tx?: Prisma.TransactionClient): Promise<MileageLog> {
    const client = tx ?? this.prisma;
    return client.mileageLog.create({ data });
  }

  async findAllByVehicleId(
    vehicleId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<MileageLog[]> {
    const client = tx ?? this.prisma;
    return client.mileageLog.findMany({
      where: { vehicleId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
