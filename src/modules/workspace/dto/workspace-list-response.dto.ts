import { ApiProperty } from '@nestjs/swagger';

import { WorkspaceResponseDto } from './workspace-response.dto';

export class WorkspaceListResponseDto {
  @ApiProperty({ type: [WorkspaceResponseDto] })
  declare data: WorkspaceResponseDto[];
}
