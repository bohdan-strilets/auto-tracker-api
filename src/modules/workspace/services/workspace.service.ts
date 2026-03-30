import { Injectable } from '@nestjs/common';

import { Workspace } from '@prisma/client';

import { WorkspaceNotFoundException } from '@common/exceptions';

import { CreateWorkspaceDto, UpdateWorkspaceDto } from '../dto';
import { WorkspaceRepository } from '../repositories';

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  // ─── CRUD ─────────────────────────────────────────────────────────────────

  async create(dto: CreateWorkspaceDto, userId: string): Promise<Workspace> {
    return this.workspaceRepository.create(dto, userId);
  }

  async findAll(userId: string) {
    return this.workspaceRepository.findAllByUserId(userId);
  }

  async getOne(workspaceId: string) {
    const workspace = await this.workspaceRepository.findByIdWithMembers(workspaceId);
    if (!workspace) throw new WorkspaceNotFoundException();
    return workspace;
  }

  async update(workspaceId: string, dto: UpdateWorkspaceDto): Promise<Workspace> {
    await this.findById(workspaceId);
    return this.workspaceRepository.update(workspaceId, dto);
  }

  async delete(workspaceId: string): Promise<void> {
    await this.findById(workspaceId);
    await this.workspaceRepository.delete(workspaceId);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  async findById(workspaceId: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findById(workspaceId);
    if (!workspace) throw new WorkspaceNotFoundException();
    return workspace;
  }

  async getName(workspaceId: string): Promise<string> {
    const workspace = await this.findById(workspaceId);
    return workspace.name;
  }
}
