import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { WorkspaceRole } from '@prisma/client';

import { MemberUserResponseDto } from './member-user-response.dto';

export class WorkspaceMemberResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare userId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare workspaceId: string;

  @ApiProperty({ enum: WorkspaceRole, example: WorkspaceRole.MEMBER })
  declare role: WorkspaceRole;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  declare createdAt: Date;

  @ApiPropertyOptional({ type: MemberUserResponseDto })
  user?: MemberUserResponseDto;
}
