import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { CreateTireChangeDto } from './dto';
import { TireChangeEventResponseDto } from './dto/tire-change-event-response.dto';
import { TireChangeService } from './tire-change.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class TireChangeController {
  constructor(private readonly tireChangeService: TireChangeService) {}

  @Post('tire-change')
  @IsAdmin()
  @ApiOperation({
    summary: 'Install tire',
    description: 'Creates a tire change event and records tire installation.',
  })
  @ApiOkResponse({ type: TireChangeEventResponseDto })
  @ApiCreateTimelineEventResponse()
  install(@Param('vehicleId', ParseUUIDPipe) vehicleId: string, @Body() dto: CreateTireChangeDto) {
    return this.tireChangeService.install(vehicleId, dto);
  }
}
