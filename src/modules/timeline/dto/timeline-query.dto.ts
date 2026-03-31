import { ApiPropertyOptional } from '@nestjs/swagger';

import { TimelineEventType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

import { PaginationDto, SortOrder } from '@common/pagination';

export class TimelineQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: TimelineEventType, example: TimelineEventType.FUEL })
  @IsOptional()
  @IsEnum(TimelineEventType)
  declare type?: TimelineEventType;

  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  declare sortOrder?: SortOrder;
}
