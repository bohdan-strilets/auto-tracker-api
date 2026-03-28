import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { WorkspaceRole } from '@prisma/client';

import { InsufficientPermissionsException } from '@common/exceptions';

import { WORKSPACE_ROLES_KEY } from '../decorators';

@Injectable()
export class WorkspaceRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<WorkspaceRole[]>(WORKSPACE_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const member = request.workspaceMember;

    if (!member) return false;
    if (!requiredRoles.includes(member.role)) {
      throw new InsufficientPermissionsException();
    }

    return true;
  }
}
