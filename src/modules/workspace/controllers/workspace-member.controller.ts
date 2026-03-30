import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUserId } from '@common/auth/decorators';
import {
  ApiGetMembersResponse,
  ApiRemoveMemberResponse,
  ApiUpdateMemberRoleResponse,
} from '@common/swagger';

import { IsAdmin, IsMember } from '../decorators';
import { UpdateMemberRoleDto } from '../dto';
import { WorkspaceMemberService, WorkspaceService } from '../services';

@ApiTags('Workspaces')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/members')
export class WorkspaceMemberController {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly workspaceMemberService: WorkspaceMemberService,
  ) {}

  @Get()
  @IsMember()
  @ApiOperation({ summary: 'List workspace members' })
  @ApiGetMembersResponse()
  getMembers(@Param('workspaceId', ParseUUIDPipe) workspaceId: string) {
    return this.workspaceMemberService.getAll(workspaceId);
  }

  @Patch(':targetUserId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update member role (Owner/Admin only)' })
  @ApiUpdateMemberRoleResponse()
  updateRole(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('targetUserId', ParseUUIDPipe) targetUserId: string,
    @Body() dto: UpdateMemberRoleDto,
    @CurrentUserId() userId: string,
  ) {
    return this.workspaceMemberService.updateRole(workspaceId, targetUserId, dto.role, userId);
  }

  @Delete(':targetUserId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsMember()
  @ApiOperation({ summary: 'Remove member or leave workspace' })
  @ApiNoContentResponse({ description: 'Member removed' })
  @ApiRemoveMemberResponse()
  async remove(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('targetUserId', ParseUUIDPipe) targetUserId: string,
    @CurrentUserId() userId: string,
  ) {
    await this.workspaceMemberService.remove(workspaceId, targetUserId, userId);
  }
}
