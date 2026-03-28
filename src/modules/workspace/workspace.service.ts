import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Workspace, WorkspaceMember, WorkspaceRole } from '@prisma/client';

import {
  AdminCannotAssignOwnerException,
  AdminCannotRemovePrivilegedException,
  InsufficientPermissionsException,
  NotWorkspaceMemberException,
  SoleOwnerException,
  WorkspaceMemberNotFoundException,
  WorkspaceNotFoundException,
} from '@common/exceptions';

import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto';
import { WorkspaceMemberRepository, WorkspaceRepository } from './repositories';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
    private readonly prisma: PrismaService,
  ) {}

  // ─── Workspace CRUD ───────────────────────────────────────────────────────

  async create(dto: CreateWorkspaceDto, userId: string): Promise<Workspace> {
    return this.workspaceRepository.create(dto, userId);
  }

  async findAll(userId: string) {
    return this.workspaceRepository.findAllByUserId(userId);
  }

  async getOne(workspaceId: string, userId: string) {
    const workspace = await this.workspaceRepository.findByIdWithMembers(workspaceId);
    if (!workspace) throw new WorkspaceNotFoundException();

    await this.assertMember(workspaceId, userId);
    return workspace;
  }

  async update(workspaceId: string, dto: UpdateWorkspaceDto, userId: string): Promise<Workspace> {
    await this.getWorkspace(workspaceId);
    await this.assertRole(workspaceId, userId, [WorkspaceRole.OWNER, WorkspaceRole.ADMIN]);

    return this.workspaceRepository.update(workspaceId, dto);
  }

  async delete(workspaceId: string, userId: string): Promise<void> {
    await this.getWorkspace(workspaceId);
    await this.assertRole(workspaceId, userId, [WorkspaceRole.OWNER]);

    await this.workspaceRepository.delete(workspaceId);
  }

  // ─── Members ──────────────────────────────────────────────────────────────

  async getMembers(workspaceId: string) {
    return this.workspaceMemberRepository.findAllByWorkspaceId(workspaceId);
  }

  async updateMemberRole(
    workspaceId: string,
    targetUserId: string,
    role: WorkspaceRole,
    requestingUserId: string,
  ): Promise<WorkspaceMember> {
    await this.getWorkspace(workspaceId);
    await this.assertRole(workspaceId, requestingUserId, [
      WorkspaceRole.OWNER,
      WorkspaceRole.ADMIN,
    ]);

    const requestingMember = await this.workspaceMemberRepository.findMember(
      workspaceId,
      requestingUserId,
    );
    if (
      requestingMember &&
      requestingMember.role === WorkspaceRole.ADMIN &&
      role === WorkspaceRole.OWNER
    ) {
      throw new AdminCannotAssignOwnerException();
    }

    const targetMember = await this.workspaceMemberRepository.findMember(workspaceId, targetUserId);
    if (!targetMember) throw new WorkspaceMemberNotFoundException();

    if (targetMember.role === WorkspaceRole.OWNER) {
      const ownerCount = await this.workspaceMemberRepository.countOwners(workspaceId);

      if (ownerCount <= 1) throw new SoleOwnerException();
    }

    return this.workspaceMemberRepository.updateRole(workspaceId, targetUserId, role);
  }

  async removeMember(
    workspaceId: string,
    targetUserId: string,
    requestingUserId: string,
  ): Promise<void> {
    await this.getWorkspace(workspaceId);

    const targetMember = await this.workspaceMemberRepository.findMember(workspaceId, targetUserId);
    if (!targetMember) throw new WorkspaceMemberNotFoundException();

    if (targetUserId === requestingUserId) {
      if (targetMember.role === WorkspaceRole.OWNER) {
        const ownerCount = await this.workspaceMemberRepository.countOwners(workspaceId);
        if (ownerCount <= 1) throw new SoleOwnerException();
      }
      await this.workspaceMemberRepository.delete(workspaceId, targetUserId);
      return;
    }

    await this.assertRole(workspaceId, requestingUserId, [
      WorkspaceRole.OWNER,
      WorkspaceRole.ADMIN,
    ]);

    const requestingMember = await this.workspaceMemberRepository.findMember(
      workspaceId,
      requestingUserId,
    );
    if (requestingMember && requestingMember.role === WorkspaceRole.ADMIN) {
      if (targetMember.role === WorkspaceRole.OWNER || targetMember.role === WorkspaceRole.ADMIN) {
        throw new AdminCannotRemovePrivilegedException();
      }
    }

    await this.workspaceMemberRepository.delete(workspaceId, targetUserId);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  async getWorkspace(workspaceId: string) {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) throw new WorkspaceNotFoundException();
    return workspace;
  }

  async assertMember(workspaceId: string, userId: string): Promise<WorkspaceMember> {
    const member = await this.workspaceMemberRepository.findMember(workspaceId, userId);

    if (!member) throw new NotWorkspaceMemberException();
    return member;
  }

  async assertRole(
    workspaceId: string,
    userId: string,
    allowedRoles: WorkspaceRole[],
  ): Promise<WorkspaceMember> {
    const member = await this.assertMember(workspaceId, userId);

    if (!allowedRoles.includes(member.role)) {
      throw new InsufficientPermissionsException();
    }

    return member;
  }
}
