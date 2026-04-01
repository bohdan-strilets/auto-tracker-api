import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TireType } from '@prisma/client';

// tire-response.dto.ts
export class TireResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare vehicleId: string;

  @ApiProperty({ example: 'Michelin' })
  declare brand: string;

  @ApiProperty({ example: 'Pilot Sport 4' })
  declare model: string;

  @ApiProperty({ enum: TireType, example: TireType.SUMMER })
  declare type: TireType;

  @ApiPropertyOptional({ example: 225 })
  declare width?: number;

  @ApiPropertyOptional({ example: 45 })
  declare aspectRatio?: number;

  @ApiPropertyOptional({ example: 18 })
  declare rimDiameter?: number;

  @ApiPropertyOptional({ example: 850.0 })
  declare price?: number;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00.000Z' })
  declare purchaseDate?: Date;

  @ApiPropertyOptional({ example: 'Good condition' })
  declare notes?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare createdAt: Date;
}
