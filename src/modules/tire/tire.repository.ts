import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, Tire } from '@prisma/client';

@Injectable()
export class TireRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    vehicleId: string,
    data: Prisma.TireCreateWithoutVehicleInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Tire> {
    const client = tx ?? this.prisma;
    return client.tire.create({ data: { ...data, vehicleId } });
  }

  async findById(tireId: string, tx?: Prisma.TransactionClient): Promise<Tire | null> {
    const client = tx ?? this.prisma;
    return client.tire.findUnique({ where: { id: tireId } });
  }

  async findAllByVehicleId(vehicleId: string, tx?: Prisma.TransactionClient): Promise<Tire[]> {
    const client = tx ?? this.prisma;
    return client.tire.findMany({
      where: { vehicleId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    tireId: string,
    data: Prisma.TireUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Tire> {
    const client = tx ?? this.prisma;
    return client.tire.update({ where: { id: tireId }, data });
  }

  async delete(tireId: string, tx?: Prisma.TransactionClient): Promise<Tire> {
    const client = tx ?? this.prisma;
    return client.tire.delete({ where: { id: tireId } });
  }
}
