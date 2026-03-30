import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DriveType, FuelType, Transmission } from '@prisma/client';

import { VehicleSpecsResponseDto } from './vehicle-specs-response.dto';

export class VehicleResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare workspaceId: string;

  @ApiProperty({ example: 'Toyota' })
  declare brand: string;

  @ApiProperty({ example: 'Camry' })
  declare model: string;

  @ApiProperty({ example: 2020 })
  declare year: number;

  @ApiPropertyOptional({ example: 'XV70' })
  declare generation?: string;

  @ApiPropertyOptional({ example: '1HGBH41JXMN109186' })
  declare vin?: string;

  @ApiPropertyOptional({ example: 'ABC-1234' })
  declare plateNumber?: string;

  @ApiPropertyOptional({ example: '2AR-FE' })
  declare engineName?: string;

  @ApiProperty({ enum: FuelType, isArray: true, example: [FuelType.PETROL] })
  declare fuelType: FuelType[];

  @ApiProperty({ enum: Transmission, example: Transmission.AUTOMATIC })
  declare transmission: Transmission;

  @ApiProperty({ enum: DriveType, example: DriveType.FWD })
  declare driveType: DriveType;

  @ApiPropertyOptional({ example: 'Pearl White' })
  declare color?: string;

  @ApiPropertyOptional({ example: 50000 })
  declare purchaseMileage?: number;

  @ApiPropertyOptional({ example: 0 })
  declare currentMileage?: number;

  @ApiPropertyOptional({ example: 'Great family car' })
  declare description?: string;

  @ApiPropertyOptional({ type: VehicleSpecsResponseDto })
  declare specs?: VehicleSpecsResponseDto;

  @ApiPropertyOptional({ example: null })
  declare deletedAt?: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare updatedAt: Date;
}
