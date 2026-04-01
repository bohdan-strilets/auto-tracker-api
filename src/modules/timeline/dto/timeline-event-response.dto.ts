import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Currency, TimelineEventType } from '@prisma/client';

import { FuelLogResponseDto } from '../events/fuel-log/dto';

export class TimelineEventResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare vehicleId: string;

  @ApiProperty({ enum: TimelineEventType, example: TimelineEventType.FUEL })
  declare type: TimelineEventType;

  @ApiProperty({ example: 'Refuel — 45.5L PETROL' })
  declare title: string;

  @ApiPropertyOptional({ example: 'Regular refuel at highway station' })
  declare description?: string;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  declare eventDate: Date;

  @ApiPropertyOptional({ example: 150000, description: 'Vehicle mileage at event time (km)' })
  declare mileage?: number;

  @ApiPropertyOptional({ example: 313.45, description: 'Total cost of the event' })
  declare cost?: number;

  @ApiPropertyOptional({ enum: Currency, example: Currency.PLN })
  declare currency?: Currency;

  @ApiPropertyOptional({
    type: FuelLogResponseDto,
    description: 'Fuel log details (only for FUEL type events)',
  })
  declare fuelLogs?: FuelLogResponseDto;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  declare createdAt: Date;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  declare updatedAt: Date;
}
