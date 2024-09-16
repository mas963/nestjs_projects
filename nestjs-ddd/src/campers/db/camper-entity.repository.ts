import { BaseEntityRepository } from '../../database/base-entity.repository';
import { Camper } from '../Camper';
import { CamperSchema } from './camper.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CamperSchemaFactory } from './camper-schema.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CamperEntityRepository extends BaseEntityRepository<
  CamperSchema,
  Camper
> {
  constructor(
    @InjectModel(CamperSchema.name)
    camperModel: Model<CamperSchema>,
    camperSchemaFactory: CamperSchemaFactory,
  ) {
    super(camperModel, camperSchemaFactory);
  }
}
