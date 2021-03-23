import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { destination, editFileName, imageFileFilter } from 'utils/multer.utils';
import { UploadService } from './upload.service';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/img')
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: diskStorage({
        destination,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImage(@UploadedFile() file) {
    return this.uploadService.UploadImage(file);
  }

  @Get('/imgs')
  async getImages(@Query() query) {
    return this.uploadService.GetImages(
      parseInt(query.skip),
      parseInt(query.limit),
    );
  }
  @Get('/test')
  async test(@Query() query) {
    return query.limit;
  }

  @Get('img/default')
  async viewImageDefault(@Res() res) {
    return this.uploadService.ViewImageDefault(res);
  }
}
