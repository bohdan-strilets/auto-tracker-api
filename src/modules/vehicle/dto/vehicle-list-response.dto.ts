import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from '@common/pagination/dto';

import { VehicleListItemResponseDto } from './vehicle-list-item-response.dto';

export class VehicleListResponseDto {
  @ApiProperty({ type: [VehicleListItemResponseDto] })
  declare data: VehicleListItemResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  declare meta: PaginationMetaDto;
}
