import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './filters/notFoundException.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
