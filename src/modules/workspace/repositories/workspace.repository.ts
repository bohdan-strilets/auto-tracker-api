import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, Workspace, WorkspaceRole } from '@prisma/client';

import { memberUserSelect } from '../selects';
import { CreateWorkspaceInput, WorkspaceWithMembers } from '../types';

@Injectable()
export class WorkspaceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    input: CreateWorkspaceInput,
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Workspace> {
    const client = tx ?? this.prisma;

    return client.workspace.create({
      data: {
        name: input.name,
        type: input.type,
        workspaceMembers: { create: { userId, role: WorkspaceRole.OWNER } },
      },
    });
  }

  async findById(id: string, tx?: Prisma.TransactionClient): Promise<Workspace | null> {
    const client = tx ?? this.prisma;
    return client.workspace.findUnique({ where: { id } });
  }

  async findAllByUserId(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<WorkspaceWithMembers[]> {
    const client = tx ?? this.prisma;
    return client.workspace.findMany({
      where: { workspaceMembers: { some: { userId } } },
      include: {
        workspaceMembers: { include: { user: { select: memberUserSelect } } },
        _count: { select: { workspaceMembers: true, vehicles: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findByIdWithMembers(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<WorkspaceWithMembers | null> {
    const client = tx ?? this.prisma;
    return client.workspace.findUnique({
      where: { id },
      include: {
        workspaceMembers: { include: { user: { select: memberUserSelect } } },
        _count: { select: { workspaceMembers: true, vehicles: true } },
      },
    });
  }

  async update(
    id: string,
    data: Prisma.WorkspaceUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Workspace> {
    const client = tx ?? this.prisma;
    return client.workspace.update({ where: { id }, data });
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<Workspace> {
    const client = tx ?? this.prisma;
    return client.workspace.delete({ where: { id } });
  }
}
