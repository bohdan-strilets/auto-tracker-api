import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({ example: 100 }) declare total: number;
  @ApiProperty({ example: 1 }) declare page: number;
  @ApiProperty({ example: 20 }) declare limit: number;
  @ApiProperty({ example: 5 }) declare totalPages: number;
}
