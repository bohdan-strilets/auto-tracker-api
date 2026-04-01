import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TimelineEventResponseDto } from '@modules/timeline/dto';
import { IsAdmin } from '@modules/workspace/decorators';

import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseService } from './purchase.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('purchase')
  @IsAdmin()
  @ApiOperation({ summary: 'Add purchase event (Admin/Owner only)' })
  @ApiOkResponse({ type: TimelineEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(@Param('vehicleId', ParseUUIDPipe) vehicleId: string, @Body() dto: CreatePurchaseDto) {
    return this.purchaseService.create(vehicleId, dto);
  }
}
