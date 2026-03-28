import { ApiProperty } from '@nestjs/swagger';

import { WorkspaceRole, WorkspaceType } from '@prisma/client';

export class WorkspaceResponseDto {
  @ApiProperty()
  declare id: string;

  @ApiProperty()
  declare name: string;

  @ApiProperty({ enum: WorkspaceType })
  declare type: WorkspaceType;

  @ApiProperty({ enum: WorkspaceRole })
  declare currentUserRole: WorkspaceRole;

  @ApiProperty()
  declare memberCount: number;

  @ApiProperty()
  declare createdAt: Date;
}
