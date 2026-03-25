import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, User } from '@prisma/client';

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
}
