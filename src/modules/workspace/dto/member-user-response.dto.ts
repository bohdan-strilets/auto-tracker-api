import { ApiProperty } from '@nestjs/swagger';

export class MemberUserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare id: string;

  @ApiProperty({ example: 'John' })
  declare firstName: string;

  @ApiProperty({ example: 'Doe' })
  declare lastName: string;

  @ApiProperty({ example: 'john@example.com' })
  declare email: string;
}
