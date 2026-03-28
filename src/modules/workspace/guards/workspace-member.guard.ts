import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { NotWorkspaceMemberException } from '@common/exceptions';

import { WorkspaceMemberRepository } from '../repositories';

@Injectable()
export class WorkspaceMemberGuard implements CanActivate {
  constructor(private readonly workspaceMemberRepository: WorkspaceMemberRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: string = request.user?.id;
    const workspaceId: string = request.params?.workspaceId;

    if (!userId || !workspaceId) throw new NotWorkspaceMemberException();

    const member = await this.workspaceMemberRepository.findMember(workspaceId, userId);
    if (!member) throw new NotWorkspaceMemberException();

    request.workspaceMember = member;
    return true;
  }
}
