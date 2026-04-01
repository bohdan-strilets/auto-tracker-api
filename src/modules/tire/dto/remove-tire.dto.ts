import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsDate, IsInt, Min } from 'class-validator';

export class RemoveTireDto {
  @ApiProperty({ example: '2024-11-01T10:00:00.000Z', description: 'Removal date' })
  @Type(() => Date)
  @IsDate()
  declare removedDate: Date;

  @ApiProperty({ example: 180000, description: 'Mileage when tire was removed' })
  @IsInt()
  @Min(0)
  declare removedMileage: number;
}
