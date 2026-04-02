import { Injectable } from '@nestjs/common';

import { Prisma, Vehicle, VehicleSpecs } from '@prisma/client';

import { VehicleNotFoundException } from '@common/exceptions';
import { paginate, PaginatedResult } from '@common/pagination';

import { CreateVehicleDto, UpdateVehicleDto, UpdateVehicleSpecsDto, VehicleQueryDto } from './dto';
import { PurchaseInput, SaleInput, VehicleListItem, VehicleWithSpecs } from './types';
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  // ─── CRUD ─────────────────────────────────────────────────────────────────

  async create(workspaceId: string, dto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.create(workspaceId, dto);
  }

  async findAll(
    workspaceId: string,
    query: VehicleQueryDto,
  ): Promise<PaginatedResult<VehicleListItem>> {
    const result = await this.vehicleRepository.findAllByWorkspaceId(workspaceId, query);
    const { data, total } = result;

    return paginate(data, total, query.page, query.limit);
  }

  async getOne(vehicleId: string, workspaceId: string): Promise<VehicleWithSpecs> {
    const vehicle = await this.vehicleRepository.findByIdWithSpecs(vehicleId);

    if (!vehicle || vehicle.workspaceId !== workspaceId) {
      throw new VehicleNotFoundException();
    }

    return vehicle;
  }

  async update(vehicleId: string, workspaceId: string, dto: UpdateVehicleDto): Promise<Vehicle> {
    await this.getOne(vehicleId, workspaceId);
    return this.vehicleRepository.update(vehicleId, dto);
  }

  async updateCurrentMileage(
    vehicleId: string,
    currentMileage: number,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    await this.vehicleRepository.update(vehicleId, { currentMileage }, tx);
  }

  async updatePurchaseInfo(
    vehicleId: string,
    input: PurchaseInput,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    await this.vehicleRepository.update(vehicleId, input, tx);
  }

  async updateSaleInfo(
    vehicleId: string,
    input: SaleInput,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    await this.vehicleRepository.update(vehicleId, input, tx);
  }

  async existsForUser(vehicleId: string, userId: string): Promise<boolean> {
    return this.vehicleRepository.existsForUser(vehicleId, userId);
  }

  async delete(vehicleId: string, workspaceId: string): Promise<void> {
    await this.getOne(vehicleId, workspaceId);
    await this.vehicleRepository.softDelete(vehicleId);
  }

  // ─── Specs ────────────────────────────────────────────────────────────────

  async updateSpecs(
    vehicleId: string,
    workspaceId: string,
    dto: UpdateVehicleSpecsDto,
  ): Promise<VehicleSpecs> {
    await this.getOne(vehicleId, workspaceId);
    return this.vehicleRepository.upsertSpecs(vehicleId, dto);
  }
}
