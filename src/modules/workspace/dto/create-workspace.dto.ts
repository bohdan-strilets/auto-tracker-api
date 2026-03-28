import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { WorkspaceType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'My Family Cars' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  declare name: string;

  @ApiPropertyOptional({ enum: WorkspaceType, default: WorkspaceType.PERSONAL })
  @IsOptional()
  @IsEnum(WorkspaceType)
  declare type?: WorkspaceType;
}
