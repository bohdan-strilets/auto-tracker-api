import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { EntityType, Media } from '@prisma/client';

import { TimelineService } from '@modules/timeline/timeline.service';
import { VehicleService } from '@modules/vehicle/vehicle.service';

import { CloudinaryService } from '@common/cloudinary/cloudinary.service';
import {
  InvalidFileTypeException,
  MediaNotFoundException,
  MediaOwnershipException,
} from '@common/exceptions';

import { ALLOWED_MIME_TYPES, ENTITY_TYPE_SUBFOLDERS, MIME_TO_MEDIA_TYPE } from './constants';
import { UploadMediaDto } from './dto';
import { MediaRepository } from './media.repository';
import { AllowedMimeType, MediaWithUrls } from './types';

@Injectable()
export class MediaService {
  constructor(
    private readonly mediaRepository: MediaRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaService,
    private readonly vehicleService: VehicleService,
    private readonly timelineService: TimelineService,
  ) {}

  async upload(
    file: Express.Multer.File,
    dto: UploadMediaDto,
    userId: string,
  ): Promise<MediaWithUrls> {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype as AllowedMimeType)) {
      throw new InvalidFileTypeException();
    }

    await this.verifyEntityOwnership(dto.entityType, dto.entityId, userId);

    const folder = `autotracker/${userId}/${ENTITY_TYPE_SUBFOLDERS[dto.entityType]}/${dto.entityId}`;
    const mediaType = MIME_TO_MEDIA_TYPE[file.mimetype];

    const uploaded = await this.cloudinaryService.uploadFile(file.buffer, {
      folder,
      resourceType: 'auto',
    });

    return this.prisma.$transaction(async (tx) => {
      const media = await this.mediaRepository.create(
        {
          user: { connect: { id: userId } },
          type: mediaType,
          mimeType: file.mimetype,
          originalName: file.originalname,
          storageKey: uploaded.publicId,
          sizeBytes: uploaded.bytes,
          width: uploaded.width,
          height: uploaded.height,
        },
        tx,
      );

      await this.mediaRepository.createUsage(
        {
          mediaId: media.id,
          entityType: dto.entityType,
          entityId: dto.entityId,
        },
        tx,
      );

      return this.attachUrls(media);
    });
  }

  async findByEntity(entityType: EntityType, entityId: string): Promise<MediaWithUrls[]> {
    const mediaList = await this.mediaRepository.findByEntity(entityType, entityId);
    return mediaList.map((media) => this.attachUrls(media));
  }

  async delete(mediaId: string, userId: string): Promise<void> {
    const media = await this.mediaRepository.findById(mediaId);
    if (!media) throw new MediaNotFoundException();

    if (media.userId !== userId) throw new MediaOwnershipException();

    await this.cloudinaryService.deleteFile(media.storageKey);
    await this.mediaRepository.delete(mediaId);
  }

  private async verifyEntityOwnership(
    entityType: EntityType,
    entityId: string,
    userId: string,
  ): Promise<void> {
    switch (entityType) {
      case EntityType.USER_AVATAR:
      case EntityType.USER_COVER:
        if (entityId !== userId) throw new MediaOwnershipException();
        break;

      case EntityType.CAR_GALLERY: {
        const exists = await this.vehicleService.existsForUser(entityId, userId);
        if (!exists) throw new MediaOwnershipException();
        break;
      }

      case EntityType.DOCUMENT_FILE:
      case EntityType.RECEIPT_IMAGE: {
        const exists = await this.timelineService.existsForUser(entityId, userId);
        if (!exists) throw new MediaOwnershipException();
        break;
      }
    }
  }

  private attachUrls(media: Media): MediaWithUrls {
    return {
      ...media,
      urls: {
        original: this.cloudinaryService.buildUrl(media.storageKey),
        thumbnail: this.cloudinaryService.buildUrl(media.storageKey, {
          width: 150,
          height: 150,
          crop: 'fill',
        }),
        small: this.cloudinaryService.buildUrl(media.storageKey, {
          width: 400,
          height: 400,
          crop: 'fill',
        }),
        medium: this.cloudinaryService.buildUrl(media.storageKey, {
          width: 800,
          crop: 'scale',
        }),
        large: this.cloudinaryService.buildUrl(media.storageKey, {
          width: 1200,
          crop: 'scale',
        }),
      },
    };
  }
}
