import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Currency } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class BaseEventDto {
  @ApiProperty({ example: 'Shell station refuel' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  declare title?: string;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  @Type(() => Date)
  @IsDate()
  declare eventDate: Date;

  @ApiPropertyOptional({ example: 150000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare mileage?: number;

  @ApiPropertyOptional({ example: 250.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  declare cost?: number;

  @ApiPropertyOptional({ enum: Currency, example: Currency.PLN })
  @IsOptional()
  @IsEnum(Currency)
  declare currency?: Currency;

  @ApiPropertyOptional({ example: 'Regular refuel' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare description?: string;
}
