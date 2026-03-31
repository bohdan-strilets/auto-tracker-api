import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { IsAdmin, IsMember } from '@modules/workspace/decorators';

import {
  ApiDeleteTimelineEventResponse,
  ApiGetTimelineEventResponse,
  ApiGetTimelineResponse,
} from '@common/swagger';

import { TimelineQueryDto } from './dto/timeline-query.dto';
import { TimelineService } from './timeline.service';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  @IsMember()
  @ApiOperation({ summary: 'Get vehicle timeline' })
  @ApiOkResponse({ description: 'Paginated timeline events' })
  @ApiGetTimelineResponse()
  findAll(@Param('vehicleId', ParseUUIDPipe) vehicleId: string, @Query() query: TimelineQueryDto) {
    return this.timelineService.findAll(vehicleId, query);
  }

  @Get(':eventId')
  @IsMember()
  @ApiOperation({ summary: 'Get timeline event by ID' })
  @ApiOkResponse({ description: 'Timeline event with details' })
  @ApiGetTimelineEventResponse()
  findOne(@Param('eventId', ParseUUIDPipe) eventId: string) {
    return this.timelineService.getOne(eventId);
  }

  @Delete(':eventId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsAdmin()
  @ApiOperation({ summary: 'Delete timeline event (Admin/Owner only)' })
  @ApiNoContentResponse({ description: 'Event deleted' })
  @ApiDeleteTimelineEventResponse()
  async delete(@Param('eventId', ParseUUIDPipe) eventId: string) {
    await this.timelineService.delete(eventId);
  }
}
