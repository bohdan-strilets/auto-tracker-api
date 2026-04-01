import { Injectable } from '@nestjs/common';

import { Tire } from '@prisma/client';

import { TireNotFoundException } from '@common/exceptions';

import { CreateTireDto, UpdateTireDto } from './dto';
import { TireRepository } from './tire.repository';

@Injectable()
export class TireService {
  constructor(private readonly tireRepository: TireRepository) {}

  async create(vehicleId: string, dto: CreateTireDto): Promise<Tire> {
    return this.tireRepository.create(vehicleId, dto);
  }

  async findAll(vehicleId: string): Promise<Tire[]> {
    return this.tireRepository.findAllByVehicleId(vehicleId);
  }

  async getOne(tireId: string, vehicleId: string): Promise<Tire> {
    const tire = await this.tireRepository.findById(tireId);

    if (!tire || tire.vehicleId !== vehicleId) {
      throw new TireNotFoundException();
    }

    return tire;
  }

  async update(tireId: string, vehicleId: string, dto: UpdateTireDto): Promise<Tire> {
    await this.getOne(tireId, vehicleId);
    return this.tireRepository.update(tireId, dto);
  }

  async delete(tireId: string, vehicleId: string): Promise<void> {
    await this.getOne(tireId, vehicleId);
    await this.tireRepository.delete(tireId);
  }

  async findById(tireId: string): Promise<Tire> {
    const tire = await this.tireRepository.findById(tireId);
    if (!tire) throw new TireNotFoundException();

    return tire;
  }
}
