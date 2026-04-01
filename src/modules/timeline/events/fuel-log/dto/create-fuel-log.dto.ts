import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FuelType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

import { BaseEventDto } from '@modules/timeline/dto';

export class CreateFuelLogDto extends BaseEventDto {
  @ApiProperty({ example: 45.5 })
  @IsNumber()
  @Min(0)
  declare liters: number;

  @ApiProperty({ example: 6.89 })
  @IsNumber()
  @Min(0)
  declare pricePerLiter: number;

  @ApiProperty({ enum: FuelType, example: FuelType.PETROL })
  @IsEnum(FuelType)
  declare fuelType: FuelType;

  @ApiPropertyOptional({ example: 'Shell' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  declare stationName?: string;

  @ApiPropertyOptional({ example: 'ul. Marszałkowska 1, Warszawa' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  declare stationAddress?: string;

  @ApiPropertyOptional({ example: 'Full tank' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare notes?: string;
}
