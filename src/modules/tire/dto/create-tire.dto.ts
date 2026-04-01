import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TireType } from '@prisma/client';
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

export class CreateTireDto {
  @ApiProperty({ example: 'Michelin' })
  @IsString()
  @MaxLength(100)
  declare brand: string;

  @ApiProperty({ example: 'Pilot Sport 4' })
  @IsString()
  @MaxLength(100)
  declare model: string;

  @ApiProperty({ enum: TireType, example: TireType.SUMMER })
  @IsEnum(TireType)
  declare type: TireType;

  @ApiPropertyOptional({ example: 225, description: 'Tire width in mm' })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare width?: number;

  @ApiPropertyOptional({ example: 45, description: 'Aspect ratio (%)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare aspectRatio?: number;

  @ApiPropertyOptional({ example: 18, description: 'Rim diameter in inches' })
  @IsOptional()
  @IsInt()
  @Min(0)
  declare rimDiameter?: number;

  @ApiPropertyOptional({ example: 850.0, description: 'Price per tire' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  declare price?: number;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  declare purchaseDate?: Date;

  @ApiPropertyOptional({ example: 'Good condition, bought new' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare notes?: string;
}
