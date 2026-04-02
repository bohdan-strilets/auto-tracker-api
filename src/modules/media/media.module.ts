import { Module } from '@nestjs/common';

import { PrismaModule } from '@db/prisma.module';

import { TimelineModule } from '@modules/timeline/timeline.module';
import { VehicleModule } from '@modules/vehicle/vehicle.module';

import { CloudinaryModule } from '@common/cloudinary/cloudinary.module';

import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { MediaService } from './media.service';

@Module({
  imports: [PrismaModule, CloudinaryModule, VehicleModule, TimelineModule],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  exports: [MediaService],
})
export class MediaModule {}
