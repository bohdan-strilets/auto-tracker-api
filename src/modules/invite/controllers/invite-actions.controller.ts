import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUserId } from '@common/auth/decorators';
import { Public } from '@common/auth/decorators';
import { ApiAcceptInviteResponse, ApiRejectInviteResponse } from '@common/swagger';

import { InviteService } from '../invite.service';

@ApiTags('Invites')
@Controller('invites')
export class InviteActionsController {
  constructor(private readonly inviteService: InviteService) {}

  @Post(':token/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accept invite (requires JWT — user must be registered)' })
  @ApiNoContentResponse()
  @ApiAcceptInviteResponse()
  async acceptInvite(@Param('token') token: string, @CurrentUserId() userId: string) {
    await this.inviteService.acceptInvite(token, userId);
  }

  @Post(':token/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @ApiOperation({ summary: 'Reject invite (no auth required)' })
  @ApiNoContentResponse()
  @ApiRejectInviteResponse()
  async rejectInvite(@Param('token') token: string) {
    await this.inviteService.rejectInvite(token);
  }
}
