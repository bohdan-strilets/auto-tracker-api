import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, WorkspaceMember, WorkspaceRole } from '@prisma/client';

import { memberUserSelect } from '../selects';
import { WorkspaceMemberWithUser } from '../types';

@Injectable()
export class WorkspaceMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMember(
    workspaceId: string,
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<WorkspaceMember | null> {
    const client = tx ?? this.prisma;
    return client.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId, userId } },
    });
  }

  async findAllByWorkspaceId(
    workspaceId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<WorkspaceMemberWithUser[]> {
    const client = tx ?? this.prisma;
    return client.workspaceMember.findMany({
      where: { workspaceId },
      include: { user: { select: memberUserSelect } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async updateRole(
    workspaceId: string,
    userId: string,
    role: WorkspaceRole,
    tx?: Prisma.TransactionClient,
  ): Promise<WorkspaceMember> {
    const client = tx ?? this.prisma;
    return client.workspaceMember.update({
      where: { workspaceId_userId: { workspaceId, userId } },
      data: { role },
    });
  }

  async delete(
    workspaceId: string,
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<WorkspaceMember> {
    const client = tx ?? this.prisma;
    return client.workspaceMember.delete({
      where: { workspaceId_userId: { workspaceId, userId } },
    });
  }

  async countOwners(workspaceId: string, tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx ?? this.prisma;
    return client.workspaceMember.count({
      where: { workspaceId, role: WorkspaceRole.OWNER },
    });
  }

  async create(
    workspaceId: string,
    userId: string,
    role: WorkspaceRole,
    tx?: Prisma.TransactionClient,
  ): Promise<WorkspaceMember> {
    const client = tx ?? this.prisma;
    return client.workspaceMember.create({
      data: { workspaceId, userId, role },
    });
  }
}
