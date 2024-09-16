import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({ imports: [MongooseModule.forRoot('mongodb://localhost:27018/ddd')] })
export class DatabaseModule {}