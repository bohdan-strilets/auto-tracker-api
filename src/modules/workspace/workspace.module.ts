import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { WorkspaceController, WorkspaceMemberController } from './controllers';
import { WorkspaceMemberGuard, WorkspaceRolesGuard } from './guards';
import { WorkspaceMemberRepository, WorkspaceRepository } from './repositories';
import { WorkspaceMemberService, WorkspaceService } from './services';

@Module({
  imports: [PrismaModule],
  controllers: [WorkspaceController, WorkspaceMemberController],
  providers: [
    WorkspaceService,
    WorkspaceMemberService,
    WorkspaceRepository,
    WorkspaceMemberRepository,
    WorkspaceMemberGuard,
    WorkspaceRolesGuard,
  ],
  exports: [WorkspaceService, WorkspaceMemberService, WorkspaceMemberRepository],
})
export class WorkspaceModule {}
