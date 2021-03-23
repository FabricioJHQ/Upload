import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: 'img', // Database name
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_IMG_URI'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
