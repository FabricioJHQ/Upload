import * as helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT || 4000);
  app.use(helmet());
  app.use(compression());
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
}
bootstrap();
