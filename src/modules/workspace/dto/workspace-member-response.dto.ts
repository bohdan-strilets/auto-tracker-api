import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { WorkspaceRole } from '@prisma/client';

export class WorkspaceMemberResponseDto {
  @ApiProperty()
  declare id: string;

  @ApiProperty()
  declare userId: string;

  @ApiProperty()
  declare workspaceId: string;

  @ApiProperty({ enum: WorkspaceRole })
  declare role: WorkspaceRole;

  @ApiProperty()
  declare createdAt: Date;

  @ApiPropertyOptional()
  declare user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
