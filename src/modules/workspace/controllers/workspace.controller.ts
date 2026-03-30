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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUserId } from '@common/auth/decorators';
import {
  ApiCreateWorkspaceResponse,
  ApiDeleteWorkspaceResponse,
  ApiGetWorkspaceResponse,
  ApiUnauthorizedResponse,
  ApiUpdateWorkspaceResponse,
} from '@common/swagger';

import { IsAdmin, IsMember, IsOwner } from '../decorators';
import { CreateWorkspaceDto, UpdateWorkspaceDto, WorkspaceResponseDto } from '../dto';
import { WorkspaceService } from '../services';

@ApiTags('Workspaces')
@ApiBearerAuth()
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace' })
  @ApiOkResponse({ type: WorkspaceResponseDto })
  @ApiCreateWorkspaceResponse()
  create(@Body() dto: CreateWorkspaceDto, @CurrentUserId() userId: string) {
    return this.workspaceService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workspaces for current user' })
  @ApiOkResponse({ type: [WorkspaceResponseDto] })
  @ApiUnauthorizedResponse()
  findAll(@CurrentUserId() userId: string) {
    return this.workspaceService.findAll(userId);
  }

  @Get(':workspaceId')
  @IsMember()
  @ApiOperation({ summary: 'Get workspace by ID' })
  @ApiOkResponse({ type: WorkspaceResponseDto })
  @ApiGetWorkspaceResponse()
  findOne(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.workspaceService.getOne(workspaceId, userId);
  }

  @Patch(':workspaceId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update workspace name or type' })
  @ApiOkResponse({ type: WorkspaceResponseDto })
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
