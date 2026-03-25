import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, User, UserStatus } from '@prisma/client';

import { CreateUserInput } from '../types';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return !!user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(input: CreateUserInput, tx?: Prisma.TransactionClient): Promise<User> {
    const client = tx ?? this.prisma;
    return client.user.create({ data: input });
  }

  async updateLastLogin(userId: string, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx ?? this.prisma;
    const now = new Date();

    await client.user.update({
      where: { id: userId },
      data: { lastLoginAt: now, loginCount: { increment: 1 } },
    });
  }

  async markEmailAsVerified(userId: string, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx ?? this.prisma;
    const now = new Date();

    await client.user.update({
      where: { id: userId },
      data: { emailVerified: true, emailVerifiedAt: now },
    });
  }

  async updateEmail(userId: string, email: string, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx ?? this.prisma;
    await client.user.update({ where: { id: userId }, data: { email } });
  }

  async updateStatus(
    userId: string,
    status: UserStatus,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;
    await client.user.update({ where: { id: userId }, data: { status } });
  }
}
