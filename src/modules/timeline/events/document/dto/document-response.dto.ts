import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DocumentType } from '@prisma/client';

export class DocumentResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare eventId: string;

  @ApiProperty({ enum: DocumentType, example: DocumentType.INSURANCE_OC })
  declare type: DocumentType;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00.000Z' })
  declare issueDate?: Date;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  declare expireDate?: Date;

  @ApiPropertyOptional({ example: 'Policy number: ABC123' })
  declare notes?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare createdAt: Date;
}
