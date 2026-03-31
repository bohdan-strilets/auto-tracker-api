import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MediaType } from '@prisma/client';

import { MediaUrlsDto } from './media-urls.dto';

export class MediaResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare userId: string;

  @ApiProperty({ enum: MediaType, example: MediaType.IMAGE })
  declare type: MediaType;

  @ApiProperty({ example: 'image/jpeg' })
  declare mimeType: string;

  @ApiProperty({ example: 'photo.jpg' })
  declare originalName: string;

  @ApiProperty({ example: 'gallery/abc123' })
  declare storageKey: string;

  @ApiProperty({ example: 204800 })
  declare sizeBytes: number;

  @ApiPropertyOptional({ example: 1920 })
  declare width?: number;

  @ApiPropertyOptional({ example: 1080 })
  declare height?: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare createdAt: Date;

  @ApiProperty({ type: MediaUrlsDto })
  declare urls: MediaUrlsDto;
}
