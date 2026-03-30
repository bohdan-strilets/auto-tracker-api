import { ResourceType } from './resource-type.type';

export type CloudinaryUploadOptions = {
  folder: string;
  publicId?: string;
  resourceType?: ResourceType;
};
