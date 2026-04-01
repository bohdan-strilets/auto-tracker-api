import { ApiProperty } from '@nestjs/swagger';

import { TimelineEventType } from '@prisma/client';

import { TimelineEventResponseDto } from '@modules/timeline/dto';

import { DocumentResponseDto } from './document-response.dto';

export class DocumentEventResponseDto extends TimelineEventResponseDto {
  @ApiProperty({ enum: TimelineEventType, example: TimelineEventType.DOCUMENT })
  declare type: TimelineEventType;

  @ApiProperty({ type: DocumentResponseDto })
  declare documents: DocumentResponseDto;
}
