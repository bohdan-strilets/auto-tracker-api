import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { EntityType } from '@prisma/client';
import { memoryStorage } from 'multer';

import { CurrentUserId } from '@common/auth/decorators';
import {
  ApiDeleteMediaResponse,
  ApiGetMediaResponse,
  ApiUploadMediaResponse,
} from '@common/swagger';

import { MAX_FILE_SIZE_BYTES } from './constants';
import { GetMediaQueryDto, MediaResponseDto } from './dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import { MediaService } from './media.service';

@ApiTags('Media')
@ApiBearerAuth()
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE_BYTES },
    }),
  )
  @ApiOperation({ summary: 'Upload media file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'entityType', 'entityId'],
      properties: {
        file: { type: 'string', format: 'binary' },
        entityType: { type: 'string', enum: Object.values(EntityType) },
        entityId: { type: 'string', format: 'uuid' },
      },
    },
  })
  @ApiOkResponse({ type: MediaResponseDto })
  @ApiUploadMediaResponse()
  upload(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @Body() dto: UploadMediaDto,
    @CurrentUserId() userId: string,
  ) {
    return this.mediaService.upload(file, dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get media by entity' })
  @ApiOkResponse({ type: [MediaResponseDto] })
  @ApiGetMediaResponse()
  findByEntity(@Query() dto: GetMediaQueryDto) {
    return this.mediaService.findByEntity(dto.entityType, dto.entityId);
  }

  @Delete(':mediaId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete media' })
  @ApiNoContentResponse({ description: 'Media deleted' })
  @ApiDeleteMediaResponse()
  async delete(@Param('mediaId', ParseUUIDPipe) mediaId: string, @CurrentUserId() userId: string) {
    await this.mediaService.delete(mediaId, userId);
  }
}
