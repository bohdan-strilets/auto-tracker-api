import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, Vehicle, VehicleSpecs } from '@prisma/client';

import { PaginatedData, SortOrder } from '@common/pagination';

import { VehicleQueryDto } from './dto';
import { VehicleSortField } from './enums';
import { vehicleListSelect } from './selects';
import { VehicleListItem, VehicleWithSpecs } from './types';

@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Vehicles ─────────────────────────────────────────────────────────────

  async create(
    workspaceId: string,
    data: Prisma.VehicleCreateWithoutWorkspaceInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Vehicle> {
    const client = tx ?? this.prisma;
    const input = { ...data, workspaceId };

    return client.vehicle.create({ data: input });
  }

  async findById(vehicleId: string, tx?: Prisma.TransactionClient): Promise<Vehicle | null> {
    const client = tx ?? this.prisma;
    const where = { id: vehicleId, deletedAt: null };

    return client.vehicle.findUnique({ where });
  }

  async findByIdWithSpecs(
    vehicleId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<VehicleWithSpecs | null> {
    const client = tx ?? this.prisma;

    const where = { id: vehicleId, deletedAt: null };
    const include = { specs: true };

    return client.vehicle.findUnique({ where, include });
  }

  async findAllByWorkspaceId(
    workspaceId: string,
    query: VehicleQueryDto,
    tx?: Prisma.TransactionClient,
  ): Promise<PaginatedData<VehicleListItem>> {
    const client = tx ?? this.prisma;

    const {
      page = 1,
      limit = 20,
      sortBy = VehicleSortField.CREATED_AT,
      sortOrder = SortOrder.DESC,
      brand,
      model,
      year,
      fuelType,
      transmission,
      driveType,
      color,
    } = query;

    const where: Prisma.VehicleWhereInput = {
      workspaceId,
      deletedAt: null,
      ...(brand && { brand: { contains: brand, mode: 'insensitive' } }),
      ...(model && { model: { contains: model, mode: 'insensitive' } }),
      ...(year && { year }),
      ...(fuelType?.length && { fuelType: { hasSome: fuelType } }),
      ...(transmission && { transmission }),
      ...(driveType && { driveType }),
      ...(color && { color: { contains: color, mode: 'insensitive' } }),
    };

    const orderBy = { [sortBy]: sortOrder };
    const skip = (page - 1) * limit;

    const result = await client.$transaction([
      client.vehicle.findMany({
        where,
        select: vehicleListSelect,
        orderBy,
        skip,
        take: limit,
      }),
      client.vehicle.count({ where }),
    ]);

    const [data, total] = result;
    return { data, total };
  }

  async existsForUser(vehicleId: string, userId: string): Promise<boolean> {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
        deletedAt: null,
        workspace: { workspaceMembers: { some: { userId } } },
      },
      select: { id: true },
    });
    return vehicle !== null;
  }

  async update(
    vehicleId: string,
    data: Prisma.VehicleUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Vehicle> {
    const client = tx ?? this.prisma;
    return client.vehicle.update({ where: { id: vehicleId }, data });
  }

  async softDelete(vehicleId: string, tx?: Prisma.TransactionClient): Promise<Vehicle> {
    const client = tx ?? this.prisma;

    const where = { id: vehicleId };
    const data = { deletedAt: new Date() };

    return client.vehicle.update({ where, data });
  }

  // ─── Specs ────────────────────────────────────────────────────────────────

  async upsertSpecs(
    vehicleId: string,
    data: Prisma.VehicleSpecsUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<VehicleSpecs> {
    const client = tx ?? this.prisma;

    return client.vehicleSpecs.upsert({
      where: { vehicleId },
      update: data,
      create: { vehicleId, ...data } as Prisma.VehicleSpecsCreateInput,
    });
  }
}
