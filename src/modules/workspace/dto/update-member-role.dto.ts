import { ApiProperty } from '@nestjs/swagger';

import { WorkspaceRole } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateMemberRoleDto {
  @ApiProperty({ enum: WorkspaceRole, example: WorkspaceRole.ADMIN })
  @IsNotEmpty()
  @IsEnum(WorkspaceRole)
  declare role: WorkspaceRole;
}
