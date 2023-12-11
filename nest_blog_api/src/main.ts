import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipte } from './core/pipes/validate.pipe';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // handle all user input validation globally
  // TODO
  app.useGlobalPipes(new ValidateInputPipte());
  await app.listen(3000);
}
bootstrap();
