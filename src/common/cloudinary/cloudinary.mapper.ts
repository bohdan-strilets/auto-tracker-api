import { UploadApiResponse } from 'cloudinary';

import { CloudinaryUploadResult } from './types';

export const mapUploadResult = (result: UploadApiResponse): CloudinaryUploadResult => {
  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    format: result.format,
    resourceType: result.resource_type,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    originalFilename: result.original_filename,
  };
};
