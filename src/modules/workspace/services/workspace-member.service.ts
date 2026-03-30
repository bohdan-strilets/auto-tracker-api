import { Injectable } from '@nestjs/common';

import { Prisma, WorkspaceMember, WorkspaceRole } from '@prisma/client';

import {
  AdminCannotAssignOwnerException,
  AdminCannotRemovePrivilegedException,
  InsufficientPermissionsException,
  NotWorkspaceMemberException,
  SoleOwnerException,
  WorkspaceMemberNotFoundException,
} from '@common/exceptions';

import { WorkspaceMemberRepository } from '../repositories';

@Injectable()
export class WorkspaceMemberService {
  constructor(private readonly workspaceMemberRepository: WorkspaceMemberRepository) {}

  // ─── Queries ──────────────────────────────────────────────────────────────

  async getAll(workspaceId: string) {
    return this.workspaceMemberRepository.findAllByWorkspaceId(workspaceId);
  }

  // ─── Commands ─────────────────────────────────────────────────────────────

  async add(
    workspaceId: string,
    userId: string,
    role: WorkspaceRole,
    tx?: Prisma.TransactionClient,
  ): Promise<WorkspaceMember> {
    return this.workspaceMemberRepository.create(workspaceId, userId, role, tx);
  }

  async updateRole(
    workspaceId: string,
    targetUserId: string,
    role: WorkspaceRole,
    requestingUserId: string,
  ): Promise<WorkspaceMember> {
    const requestingMember = await this.assertRole(workspaceId, requestingUserId, [
      WorkspaceRole.OWNER,
      WorkspaceRole.ADMIN,
    ]);

    if (requestingMember.role === WorkspaceRole.ADMIN && role === WorkspaceRole.OWNER) {
      throw new AdminCannotAssignOwnerException();
    }

    const targetMember = await this.getMember(workspaceId, targetUserId);

    if (targetMember.role === WorkspaceRole.OWNER) {
      const ownerCount = await this.workspaceMemberRepository.countOwners(workspaceId);
      if (ownerCount <= 1) throw new SoleOwnerException();
    }

    return this.workspaceMemberRepository.updateRole(workspaceId, targetUserId, role);
  }

  async remove(workspaceId: string, targetUserId: string, requestingUserId: string): Promise<void> {
    const targetMember = await this.getMember(workspaceId, targetUserId);

    if (targetUserId === requestingUserId) {
      if (targetMember.role === WorkspaceRole.OWNER) {
        const ownerCount = await this.workspaceMemberRepository.countOwners(workspaceId);
        if (ownerCount <= 1) throw new SoleOwnerException();
      }
      await this.workspaceMemberRepository.delete(workspaceId, targetUserId);
      return;
    }

    const requestingMember = await this.assertRole(workspaceId, requestingUserId, [
      WorkspaceRole.OWNER,
      WorkspaceRole.ADMIN,
    ]);

    if (requestingMember.role === WorkspaceRole.ADMIN) {
      if (targetMember.role === WorkspaceRole.OWNER || targetMember.role === WorkspaceRole.ADMIN) {
        throw new AdminCannotRemovePrivilegedException();
      }
    }

    await this.workspaceMemberRepository.delete(workspaceId, targetUserId);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  async findMember(workspaceId: string, userId: string): Promise<WorkspaceMember | null> {
    return this.workspaceMemberRepository.findMember(workspaceId, userId);
  }

  async getMember(workspaceId: string, userId: string): Promise<WorkspaceMember> {
    const member = await this.workspaceMemberRepository.findMember(workspaceId, userId);
    if (!member) throw new WorkspaceMemberNotFoundException();
    return member;
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
    if (!allowedRoles.includes(member.role)) throw new InsufficientPermissionsException();
    return member;
  }

  async getRole(workspaceId: string, userId: string): Promise<WorkspaceRole> {
    const member = await this.assertMember(workspaceId, userId);
    return member.role;
  }
}
