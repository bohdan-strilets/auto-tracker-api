import { ApiProperty } from '@nestjs/swagger';

import { InviteStatus, WorkspaceRole } from '@prisma/client';

export class InviteResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare workspaceId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare invitedById: string;

  @ApiProperty({ example: 'john@example.com' })
  declare email: string;

  @ApiProperty({ enum: WorkspaceRole, example: WorkspaceRole.MEMBER })
  declare role: WorkspaceRole;

  @ApiProperty({ enum: InviteStatus, example: InviteStatus.PENDING })
  declare status: InviteStatus;

  @ApiProperty({ example: '2024-01-08T00:00:00.000Z' })
  declare expiresAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare createdAt: Date;
}
