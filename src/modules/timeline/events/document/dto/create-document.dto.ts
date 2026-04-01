import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DocumentType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { BaseEventDto } from '@modules/timeline/dto';

export class CreateDocumentDto extends BaseEventDto {
  @ApiProperty({ enum: DocumentType, example: DocumentType.INSURANCE_OC })
  @IsEnum(DocumentType)
  declare type: DocumentType;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00.000Z', description: 'Document issue date' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  declare issueDate?: Date;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z', description: 'Document expiry date' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  declare expireDate?: Date;

  @ApiPropertyOptional({ example: 'Policy number: ABC123' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare notes?: string;
}
