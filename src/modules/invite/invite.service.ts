import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Invite, InviteStatus, WorkspaceRole } from '@prisma/client';

import { UserService } from '@modules/user/user.service';
import { WorkspaceMemberService, WorkspaceService } from '@modules/workspace/services';

import {
  InsufficientPermissionsException,
  InviteAlreadyExistsException,
  InviteExpiredException,
  InviteNotFoundException,
  WorkspaceMemberAlreadyExistsException,
} from '@common/exceptions';
import { MailService } from '@common/mail/mail.service';
import { normalizeEmail } from '@common/utils/normalize-email';

import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteRepository } from './invite.repository';

const INVITE_EXPIRES_IN_DAYS = 7;

@Injectable()
export class InviteService {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly workspaceService: WorkspaceService,
    private readonly workspaceMemberService: WorkspaceMemberService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}

  async sendInvite(
    workspaceId: string,
    dto: CreateInviteDto,
    invitedById: string,
  ): Promise<Invite> {
    const email = normalizeEmail(dto.email);
    const role = dto.role ?? WorkspaceRole.MEMBER;

    const requestingRole = await this.workspaceMemberService.getRole(workspaceId, invitedById);
    if (requestingRole === WorkspaceRole.ADMIN && role === WorkspaceRole.OWNER) {
      throw new InsufficientPermissionsException();
    }

    const existing = await this.inviteRepository.findByWorkspaceAndEmail(workspaceId, email);
    if (existing && existing.status === InviteStatus.PENDING) {
      throw new InviteAlreadyExistsException();
    }

    if (existing) {
      await this.inviteRepository.delete(existing.id);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + INVITE_EXPIRES_IN_DAYS);

    const invite = await this.inviteRepository.create({
      workspaceId,
      invitedById,
      email,
      role,
      expiresAt,
    });

    const [workspaceName, invitedByName] = await Promise.all([
      this.workspaceService.getName(workspaceId),
      this.userService.getFullName(invitedById),
    ]);

    await this.mailService.sendWorkspaceInvite({
      to: email,
      token: invite.token,
      workspaceName: workspaceName,
      invitedByName: invitedByName,
      role,
    });

    return invite;
  }

  async getInvites(workspaceId: string): Promise<Invite[]> {
    return this.inviteRepository.findAllByWorkspaceId(workspaceId);
  }

  async cancelInvite(workspaceId: string, inviteId: string): Promise<void> {
    const invite = await this.inviteRepository.findById(inviteId);
    if (!invite || invite.workspaceId !== workspaceId) {
      throw new InviteNotFoundException();
    }

    await this.inviteRepository.delete(inviteId);
  }

  async acceptInvite(token: string, userId: string): Promise<void> {
    const invite = await this.getValidInvite(token);

    const existingMember = await this.workspaceMemberService.findMember(invite.workspaceId, userId);
    if (existingMember) throw new WorkspaceMemberAlreadyExistsException();

    await this.prisma.$transaction(async (tx) => {
      await this.workspaceMemberService.add(invite.workspaceId, userId, invite.role, tx);
      await this.inviteRepository.updateStatus(invite.id, InviteStatus.ACCEPTED, tx);
    });
  }

  async rejectInvite(token: string): Promise<void> {
    const invite = await this.getValidInvite(token);
    await this.inviteRepository.updateStatus(invite.id, InviteStatus.REJECTED);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private async getValidInvite(token: string): Promise<Invite> {
    const invite = await this.inviteRepository.findByToken(token);

    if (!invite) {
      throw new InviteNotFoundException();
    }
    if (invite.status !== InviteStatus.PENDING) {
      throw new InviteNotFoundException();
    }
    if (invite.expiresAt < new Date()) {
      throw new InviteExpiredException();
    }

    return invite;
  }
}
