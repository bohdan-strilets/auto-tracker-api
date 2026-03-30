import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleSpecsResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare vehicleId: string;

  @ApiPropertyOptional({ example: '2AR-FE' })
  declare engineCode?: string;

  @ApiPropertyOptional({ example: 181 })
  declare enginePowerHp?: number;

  @ApiPropertyOptional({ example: 133 })
  declare enginePowerKw?: number;

  @ApiPropertyOptional({ example: 235 })
  declare torqueNm?: number;

  @ApiPropertyOptional({ example: 60.0 })
  declare fuelTankCapacity?: number;

  @ApiPropertyOptional({ example: 10.5 })
  declare cityConsumption?: number;

  @ApiPropertyOptional({ example: 7.2 })
  declare highwayConsumption?: number;

  @ApiPropertyOptional({ example: 8.5 })
  declare combinedConsumption?: number;

  @ApiPropertyOptional({ example: 4885 })
  declare lengthMm?: number;

  @ApiPropertyOptional({ example: 1840 })
  declare widthMm?: number;

  @ApiPropertyOptional({ example: 1455 })
  declare heightMm?: number;

  @ApiPropertyOptional({ example: 1560 })
  declare weightKg?: number;
}
