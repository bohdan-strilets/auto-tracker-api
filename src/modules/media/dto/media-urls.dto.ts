import { ApiProperty } from '@nestjs/swagger';

export class MediaUrlsDto {
  @ApiProperty({ example: 'https://res.cloudinary.com/...' })
  declare original: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...w_150,h_150...' })
  declare thumbnail: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...w_400...' })
  declare small: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...w_800...' })
  declare medium: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...w_1200...' })
  declare large: string;
}
