import { ApiProperty } from '@nestjs/swagger';

export class WorkspaceCountResponseDto {
  @ApiProperty({ example: 3 })
  declare workspaceMembers: number;

  @ApiProperty({ example: 5 })
  declare vehicles: number;
}
