import { Injectable } from '@nestjs/common';

import { Tire } from '@prisma/client';

import { VehicleService } from '@modules/vehicle/vehicle.service';

import { TireNotFoundException } from '@common/exceptions';

import { CreateTireDto, UpdateTireDto } from './dto';
import { TireRepository } from './tire.repository';

@Injectable()
export class TireService {
  constructor(
    private readonly tireRepository: TireRepository,
    private readonly vehicleService: VehicleService,
  ) {}

  async create(vehicleId: string, workspaceId: string, dto: CreateTireDto): Promise<Tire> {
    await this.vehicleService.getOne(vehicleId, workspaceId);
    return this.tireRepository.create(vehicleId, dto);
  }

  async findAll(vehicleId: string, workspaceId: string): Promise<Tire[]> {
    await this.vehicleService.getOne(vehicleId, workspaceId);
    return this.tireRepository.findAllByVehicleId(vehicleId);
  }

  async getOne(tireId: string, vehicleId: string, workspaceId: string): Promise<Tire> {
    await this.vehicleService.getOne(vehicleId, workspaceId);

    const tire = await this.tireRepository.findById(tireId);
    if (!tire || tire.vehicleId !== vehicleId) {
      throw new TireNotFoundException();
    }

    return tire;
  }

  async update(
    tireId: string,
    vehicleId: string,
    workspaceId: string,
    dto: UpdateTireDto,
  ): Promise<Tire> {
    await this.getOne(tireId, vehicleId, workspaceId);
    return this.tireRepository.update(tireId, dto);
  }

  async delete(tireId: string, vehicleId: string, workspaceId: string): Promise<void> {
    await this.getOne(tireId, vehicleId, workspaceId);
    await this.tireRepository.delete(tireId);
  }

  async findById(tireId: string): Promise<Tire> {
    const tire = await this.tireRepository.findById(tireId);
    if (!tire) throw new TireNotFoundException();

    return tire;
  }
}
