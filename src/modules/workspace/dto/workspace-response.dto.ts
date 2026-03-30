import { ApiProperty } from '@nestjs/swagger';

import { WorkspaceRole, WorkspaceType } from '@prisma/client';

export class WorkspaceResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: 'My Garage' })
  declare name: string;

  @ApiProperty({ enum: WorkspaceType, example: WorkspaceType.PERSONAL })
  declare type: WorkspaceType;

  @ApiProperty({ enum: WorkspaceRole, example: WorkspaceRole.OWNER })
  declare currentUserRole: WorkspaceRole;

  @ApiProperty({ example: 1 })
  declare memberCount: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare createdAt: Date;
}
