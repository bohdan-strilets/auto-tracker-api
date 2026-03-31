import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from '@common/pagination';

import { TimelineEventResponseDto } from './timeline-event-response.dto';

export class TimelineListResponseDto {
  @ApiProperty({ type: [TimelineEventResponseDto] })
  declare data: TimelineEventResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  declare meta: PaginationMetaDto;
}
