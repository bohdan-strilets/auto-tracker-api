import { applyDecorators, UseGuards } from '@nestjs/common';

import { WorkspaceRole } from '@prisma/client';

import { WorkspaceMemberGuard, WorkspaceRolesGuard } from '../guards';

import { WorkspaceRoles } from './workspace-roles.decorator';

export const IsAdmin = () =>
  applyDecorators(
    UseGuards(WorkspaceMemberGuard, WorkspaceRolesGuard),
    WorkspaceRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN),
  );
