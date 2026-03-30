import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Invite, InviteStatus, Prisma } from '@prisma/client';

import { CreateInviteInput } from './types';

@Injectable()
export class InviteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateInviteInput, tx?: Prisma.TransactionClient): Promise<Invite> {
    const client = tx ?? this.prisma;
    return client.invite.create({ data: input });
  }

  async findByToken(token: string, tx?: Prisma.TransactionClient): Promise<Invite | null> {
    const client = tx ?? this.prisma;
    return client.invite.findUnique({ where: { token } });
  }

  async findById(id: string, tx?: Prisma.TransactionClient): Promise<Invite | null> {
    const client = tx ?? this.prisma;
    return client.invite.findUnique({ where: { id } });
  }

  async findByWorkspaceAndEmail(
    workspaceId: string,
    email: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Invite | null> {
    const client = tx ?? this.prisma;
    return client.invite.findUnique({ where: { workspaceId_email: { workspaceId, email } } });
  }

  async findAllByWorkspaceId(
    workspaceId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Invite[]> {
    const client = tx ?? this.prisma;
    return client.invite.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(
    id: string,
    status: InviteStatus,
    tx?: Prisma.TransactionClient,
  ): Promise<Invite> {
    const client = tx ?? this.prisma;
    return client.invite.update({ where: { id }, data: { status } });
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<Invite> {
    const client = tx ?? this.prisma;
    return client.invite.delete({ where: { id } });
  }
}
