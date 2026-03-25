import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { User, UserSettings, UserStatus } from '@prisma/client';

import { normalizeEmail } from '@common/email';
import { UserNotFoundException } from '@common/exceptions';

import { UserRepository, UserSettingsRepository } from './repositories';
import { CreateUserInput, UpdateUserSettingsInput } from './types';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly userSettingsRepository: UserSettingsRepository,
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const normalizedEmail = normalizeEmail(email);
    return this.userRepository.emailExists(normalizedEmail);
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = normalizeEmail(email);
    return this.userRepository.findByEmail(normalizedEmail);
  }

  async getByEmail(email: string): Promise<User> {
    const normalizedEmail = normalizeEmail(email);
    const user = await this.userRepository.findByEmail(normalizedEmail);

    if (!user) throw new UserNotFoundException();
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new UserNotFoundException();
    return user;
  }

  async create(input: CreateUserInput): Promise<User> {
    const normalizedEmail = normalizeEmail(input.email);
    const userData: CreateUserInput = { ...input, email: normalizedEmail };

    return this.prisma.$transaction(async (tx) => {
      const user = await this.userRepository.createUser(userData, tx);
      await this.userSettingsRepository.create(user.id, tx);
      return user;
    });
  }

  async handleSuccessfulLogin(userId: string): Promise<void> {
    await this.userRepository.updateLastLogin(userId);
  }

  async markEmailAsVerified(userId: string): Promise<void> {
    await this.userRepository.markEmailAsVerified(userId);
  }

  async updateEmail(userId: string, newEmail: string): Promise<void> {
    const normalizedEmail = normalizeEmail(newEmail);
    await this.userRepository.updateEmail(userId, normalizedEmail);
  }

  async updateStatus(userId: string, status: UserStatus): Promise<void> {
    await this.userRepository.updateStatus(userId, status);
  }

  async getSettings(userId: string): Promise<UserSettings | null> {
    return this.userSettingsRepository.findByUserId(userId);
  }

  async updateSettings(userId: string, input: UpdateUserSettingsInput): Promise<UserSettings> {
    return this.userSettingsRepository.update(userId, input);
  }
}
