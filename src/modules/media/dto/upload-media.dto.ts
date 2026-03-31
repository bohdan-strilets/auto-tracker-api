import { ApiProperty } from '@nestjs/swagger';

import { EntityType } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';

export class UploadMediaDto {
  @ApiProperty({ enum: EntityType, example: EntityType.CAR_GALLERY })
  @IsEnum(EntityType)
  declare entityType: EntityType;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  declare entityId: string;
}
