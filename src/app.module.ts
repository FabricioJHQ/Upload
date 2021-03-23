import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo.module';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongoModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
