import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsDate, IsInt, IsUUID, Min, IsOptional } from 'class-validator';

import { BaseEventDto } from '@modules/timeline/dto';

export class CreateTireChangeDto extends BaseEventDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  declare eventDate: Date;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Tire to install' })
  @IsUUID()
  declare installTireId: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Tire to remove (optional)',
  })
  @IsOptional()
  @IsUUID()
  declare removeTireId?: string;

  @ApiProperty({ example: '2024-11-01T10:00:00.000Z' })
  @Type(() => Date)
  @IsDate()
  declare installedDate: Date;

  @ApiProperty({ example: 180000 })
  @IsInt()
  @Min(0)
  declare installedMileage: number;
}
