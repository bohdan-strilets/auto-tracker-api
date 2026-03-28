import { Module } from '@nestjs/common';

import { PrismaModule } from '../../db/prisma.module';

import { WorkspaceMemberGuard, WorkspaceRolesGuard } from './guards';
import { WorkspaceMemberRepository, WorkspaceRepository } from './repositories';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkspaceController],
  providers: [
    WorkspaceService,
    WorkspaceRepository,
    WorkspaceMemberRepository,
    WorkspaceMemberGuard,
    WorkspaceRolesGuard,
  ],
  exports: [WorkspaceService, WorkspaceMemberRepository],
})
export class WorkspaceModule {}
