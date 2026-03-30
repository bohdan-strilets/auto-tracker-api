export type CloudinaryUploadResult = {
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  resourceType: string;
  width?: number;
  height?: number;
  bytes: number;
  originalFilename: string;
};
