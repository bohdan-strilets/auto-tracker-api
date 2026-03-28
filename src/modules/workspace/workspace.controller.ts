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
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUserId } from '@common/auth/decorators';

import { IsAdmin, IsMember, IsOwner } from './decorators';
import { CreateWorkspaceDto, UpdateMemberRoleDto, UpdateWorkspaceDto } from './dto';
import { WorkspaceService } from './workspace.service';

@ApiTags('workspaces')
@ApiBearerAuth()
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace' })
  create(@Body() dto: CreateWorkspaceDto, @CurrentUserId() userId: string) {
    return this.workspaceService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workspaces for current user' })
  findAll(@CurrentUserId() userId: string) {
    return this.workspaceService.findAll(userId);
  }

  @Get(':workspaceId')
  @IsMember()
  @ApiOperation({ summary: 'Get workspace by ID' })
  findOne(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.workspaceService.getOne(workspaceId, userId);
  }

  @Patch(':workspaceId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update workspace name or type' })
  update(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Body() dto: UpdateWorkspaceDto,
    @CurrentUserId() userId: string,
  ) {
    return this.workspaceService.update(workspaceId, dto, userId);
  }

  @Delete(':workspaceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsOwner()
  @ApiOperation({ summary: 'Delete workspace (Owner only)' })
  @ApiNoContentResponse()
  async delete(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @CurrentUserId() userId: string,
  ) {
    await this.workspaceService.delete(workspaceId, userId);
  }

  // ─── Members ────────────────────────────────────────────────────────────────

  @Get(':workspaceId/members')
  @IsMember()
  @ApiOperation({ summary: 'List workspace members' })
  getMembers(@Param('workspaceId', ParseUUIDPipe) workspaceId: string) {
    return this.workspaceService.getMembers(workspaceId);
  }

  @Patch(':workspaceId/members/:targetUserId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update member role (Owner/Admin only)' })
  updateMemberRole(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('targetUserId', ParseUUIDPipe) targetUserId: string,
    @Body() dto: UpdateMemberRoleDto,
    @CurrentUserId() userId: string,
  ) {
    return this.workspaceService.updateMemberRole(workspaceId, targetUserId, dto.role, userId);
  }

  @Delete(':workspaceId/members/:targetUserId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsMember()
  @ApiOperation({ summary: 'Remove member or leave workspace' })
  @ApiNoContentResponse()
  async removeMember(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('targetUserId', ParseUUIDPipe) targetUserId: string,
    @CurrentUserId() userId: string,
  ) {
    await this.workspaceService.removeMember(workspaceId, targetUserId, userId);
  }
}
