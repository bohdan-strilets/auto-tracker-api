import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { EntityType, Media, MediaUsage, Prisma } from '@prisma/client';

import { MediaWithUsages } from './types';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MediaCreateInput, tx?: Prisma.TransactionClient): Promise<Media> {
    const client = tx ?? this.prisma;
    return client.media.create({ data });
  }

  async findById(id: string, tx?: Prisma.TransactionClient): Promise<Media | null> {
    const client = tx ?? this.prisma;
    return client.media.findUnique({ where: { id } });
  }

  async findByIdWithUsages(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<MediaWithUsages | null> {
    const client = tx ?? this.prisma;
    return client.media.findUnique({
      where: { id },
      include: { mediaUsages: true },
    });
  }

  async findByEntity(
    entityType: EntityType,
    entityId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Media[]> {
    const client = tx ?? this.prisma;
    return client.media.findMany({
      where: { mediaUsages: { some: { entityType, entityId } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<Media> {
    const client = tx ?? this.prisma;
    return client.media.delete({ where: { id } });
  }

  async createUsage(
    data: { mediaId: string; entityType: EntityType; entityId: string },
    tx?: Prisma.TransactionClient,
  ): Promise<MediaUsage> {
    const client = tx ?? this.prisma;
    return client.mediaUsage.create({ data });
  }
}
