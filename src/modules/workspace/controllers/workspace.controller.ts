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
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUserId } from '@common/auth/decorators';
import {
  ApiCreateWorkspaceResponse,
  ApiDeleteWorkspaceResponse,
  ApiGetWorkspaceResponse,
  ApiUpdateWorkspaceResponse,
} from '@common/swagger';

import { IsAdmin, IsMember, IsOwner } from '../decorators';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from '../dto';
import { WorkspaceService } from '../services';

@ApiTags('Workspaces')
@ApiBearerAuth()
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace' })
  @ApiCreateWorkspaceResponse()
  create(@Body() dto: CreateWorkspaceDto, @CurrentUserId() userId: string) {
    return this.workspaceService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workspaces for current user' })
  @ApiUnauthorizedResponse()
  findAll(@CurrentUserId() userId: string) {
    return this.workspaceService.findAll(userId);
  }

  @Get(':workspaceId')
  @IsMember()
  @ApiOperation({ summary: 'Get workspace by ID' })
  @ApiGetWorkspaceResponse()
  findOne(@Param('workspaceId', ParseUUIDPipe) workspaceId: string) {
    return this.workspaceService.getOne(workspaceId);
  }

  @Patch(':workspaceId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update workspace name or type' })
  @ApiUpdateWorkspaceResponse()
  update(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Body() dto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(workspaceId, dto);
  }

  @Delete(':workspaceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsOwner()
  @ApiOperation({ summary: 'Delete workspace (Owner only)' })
  @ApiNoContentResponse({ description: 'Workspace deleted' })
  @ApiDeleteWorkspaceResponse()
  async delete(@Param('workspaceId', ParseUUIDPipe) workspaceId: string) {
    await this.workspaceService.delete(workspaceId);
  }
}
