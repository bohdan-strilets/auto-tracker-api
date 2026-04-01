import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

import { BaseEventDto } from '@modules/timeline/dto';

export class CreatePurchaseDto extends BaseEventDto {
  @ApiProperty({ example: 45000.0, description: 'Purchase price' })
  @IsNumber()
  @Min(0)
  declare cost: number;

  @ApiProperty({ example: 50000, description: 'Mileage at purchase time' })
  @IsInt()
  @Min(0)
  declare mileage: number;

  @ApiPropertyOptional({ example: 'Bought from private seller' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  declare notes?: string;
}
