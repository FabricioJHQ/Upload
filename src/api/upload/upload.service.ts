import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUpload } from './upload.interface';
import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { UploadDTO } from './upload.dto';
import { join } from 'path';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel('upload')
    private readonly uploadModel: Model<IUpload>,
    private readonly configService: ConfigService,
  ) {
    v2.config({
      cloud_name: this.configService.get<string>('CLOUD_NAME'),
      api_key: this.configService.get<string>('API_KEY'),
      api_secret: this.configService.get<string>('API_SECRET'),
    });
  }

  async UploadImage(file): Promise<IUpload> {
    try {
      const image = await v2.uploader.upload(file.path, function () {
        return;
      });
      const payload: UploadDTO = {
        path: image.secure_url,
      };
      return new this.uploadModel(payload).save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async GetImages(skip, limit): Promise<IUpload[]> {
    return this.uploadModel.find().sort({ date: -1 }).skip(skip).limit(limit);
  }

  async ViewImageDefault(res) {
    try {
      res.sendFile(join(__dirname, `../../../../upload/upload.jpg`));
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error,
          message: 'La imagen que solicitó no existe.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
