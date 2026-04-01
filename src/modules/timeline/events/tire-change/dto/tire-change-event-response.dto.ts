import { ApiProperty } from '@nestjs/swagger';

import { TimelineEventType } from '@prisma/client';

import { TimelineEventResponseDto } from '@modules/timeline/dto';

import { TireChangeResponseDto } from './tire-change-response.dto';

export class TireChangeEventResponseDto extends TimelineEventResponseDto {
  @ApiProperty({ enum: TimelineEventType, example: TimelineEventType.TIRE_CHANGE })
  declare type: TimelineEventType;

  @ApiProperty({ type: TireChangeResponseDto })
  declare tireChange: TireChangeResponseDto;
}
