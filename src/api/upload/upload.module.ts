import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload.controller';
import { UploadSchema } from './upload.model';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'upload',
          schema: UploadSchema,
        },
      ],
      'img',
    ),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
