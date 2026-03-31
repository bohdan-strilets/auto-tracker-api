import { EntityType } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';

export class GetMediaQueryDto {
  @IsEnum(EntityType)
  declare entityType: EntityType;

  @IsUUID()
  declare entityId: string;
}
