import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TireChangeResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare eventId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare tireId: string;

  @ApiProperty({ example: '2024-04-01T10:00:00.000Z' })
  declare installedDate: Date;

  @ApiProperty({ example: 150000 })
  declare installedMileage: number;

  @ApiPropertyOptional({ example: '2024-11-01T10:00:00.000Z' })
  declare removedDate?: Date;

  @ApiPropertyOptional({ example: 180000 })
  declare removedMileage?: number;

  @ApiProperty({ example: '2024-04-01T10:00:00.000Z' })
  declare createdAt: Date;
}
