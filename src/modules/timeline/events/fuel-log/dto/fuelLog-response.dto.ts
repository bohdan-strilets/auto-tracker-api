import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FuelType } from '@prisma/client';

export class FuelLogResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: 45.5, description: 'Amount of fuel in liters' })
  declare liters: number;

  @ApiProperty({ example: 6.89, description: 'Price per liter' })
  declare pricePerLiter: number;

  @ApiProperty({ enum: FuelType, example: FuelType.PETROL })
  declare fuelType: FuelType;

  @ApiPropertyOptional({ example: 'Shell', description: 'Fuel station name' })
  declare stationName?: string;

  @ApiPropertyOptional({ example: 'ul. Marszałkowska 1, Warszawa' })
  declare stationAddress?: string;

  @ApiPropertyOptional({ example: 'Full tank' })
  declare notes?: string;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  declare createdAt: Date;
}
