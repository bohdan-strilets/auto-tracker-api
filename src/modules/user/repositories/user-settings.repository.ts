import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, UserSettings } from '@prisma/client';

import { UpdateUserSettingsInput } from '../types';

@Injectable()
export class UserSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, tx?: Prisma.TransactionClient): Promise<UserSettings> {
    const client = tx ?? this.prisma;
    return client.userSettings.create({ data: { userId } });
  }

  async findByUserId(userId: string): Promise<UserSettings | null> {
    return this.prisma.userSettings.findUnique({ where: { userId } });
  }

  async update(userId: string, input: UpdateUserSettingsInput): Promise<UserSettings> {
    return this.prisma.userSettings.update({
      where: { userId },
      data: input,
    });
  }
}
