import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DriveType, FuelType, Transmission } from '@prisma/client';

export class VehicleListItemResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: 'Toyota' })
  declare brand: string;

  @ApiProperty({ example: 'Camry' })
  declare model: string;

  @ApiProperty({ example: 2020 })
  declare year: number;

  @ApiPropertyOptional({ example: 'XV70' })
  declare generation?: string;

  @ApiPropertyOptional({ example: 'ABC-1234' })
  declare plateNumber?: string;

  @ApiProperty({ enum: FuelType, isArray: true, example: [FuelType.PETROL] })
  declare fuelType: FuelType[];

  @ApiProperty({ enum: Transmission, example: Transmission.AUTOMATIC })
  declare transmission: Transmission;

  @ApiProperty({ enum: DriveType, example: DriveType.FWD })
  declare driveType: DriveType;

  @ApiPropertyOptional({ example: 'Pearl White' })
  declare color?: string;

  @ApiPropertyOptional({ example: 50000 })
  declare currentMileage?: number;

  @ApiPropertyOptional({ example: null })
  declare deletedAt?: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare updatedAt: Date;
}
