import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { IsAdmin, IsMember } from '@modules/workspace/decorators';

import { CurrentUserId } from '@common/auth/decorators';
import {
  ApiCancelInviteResponse,
  ApiGetInvitesResponse,
  ApiSendInviteResponse,
} from '@common/swagger';

import { CreateInviteDto, InviteResponseDto } from '../dto';
import { InviteService } from '../invite.service';

@ApiTags('Invites')
@ApiBearerAuth()
@Controller('invites')
export class WorkspaceInviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post(':workspaceId/invites')
  @IsAdmin()
  @ApiOperation({ summary: 'Send workspace invite (Admin/Owner only)' })
  @ApiOkResponse({ type: InviteResponseDto })
  @ApiSendInviteResponse()
  sendInvite(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Body() dto: CreateInviteDto,
    @CurrentUserId() userId: string,
  ) {
    return this.inviteService.sendInvite(workspaceId, dto, userId);
  }

  @Get(':workspaceId/invites')
  @IsMember()
  @ApiOperation({ summary: 'List workspace invites' })
  @ApiOkResponse({ type: [InviteResponseDto] })
  @ApiGetInvitesResponse()
  getInvites(@Param('workspaceId', ParseUUIDPipe) workspaceId: string) {
    return this.inviteService.getInvites(workspaceId);
  }

  @Delete(':workspaceId/invites/:inviteId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsAdmin()
  @ApiOperation({ summary: 'Cancel invite (Admin/Owner only)' })
  @ApiNoContentResponse()
  @ApiCancelInviteResponse()
  async cancelInvite(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('inviteId', ParseUUIDPipe) inviteId: string,
  ) {
    await this.inviteService.cancelInvite(workspaceId, inviteId);
  }
}
