import { Injectable, Logger } from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';

import { ConfigService } from '@config/config.service';

import { mapUploadResult } from './cloudinary.mapper';
import {
  CloudinaryTransformation,
  CloudinaryUploadOptions,
  CloudinaryUploadResult,
  ResourceType,
} from './types';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.cloudinaryCloudName,
      api_key: this.config.cloudinaryApiKey,
      api_secret: this.config.cloudinaryApiSecret,
    });
  }

  async uploadFile(
    buffer: Buffer,
    options: CloudinaryUploadOptions,
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder,
          public_id: options.publicId,
          resource_type: options.resourceType ?? 'auto',
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            this.logger.error('Cloudinary upload failed', error);
            reject(new Error(error.message));
            return;
          }

          if (!result) {
            reject(new Error('Cloudinary upload returned no result'));
            return;
          }

          resolve(mapUploadResult(result));
        },
      );

      uploadStream.end(buffer);
    });
  }

  async deleteFile(publicId: string, resourceType: ResourceType = 'image'): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
      this.logger.error(`Cloudinary delete failed for ${publicId}`, error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  buildUrl(publicId: string, transformation?: CloudinaryTransformation): string {
    return cloudinary.url(publicId, {
      secure: true,
      transformation: transformation ? [transformation] : undefined,
    });
  }
}
