import { EntitySchemaFactory } from '../../database/entity-schema.factory';
import { CamperSchema } from './camper.schema';
import { Camper } from '../Camper';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CamperSchemaFactory
  implements EntitySchemaFactory<CamperSchema, Camper>
{
  create(camper: Camper): CamperSchema {
    return {
      _id: new ObjectId(camper.getId()),
      name: camper.getName(),
      age: camper.getAge(),
      allergies: camper.getAllergies(),
    };
  }

  createFromSchema(camperSchema: CamperSchema): Camper {
    return new Camper(
      camperSchema._id.toHexString(),
      camperSchema.name,
      camperSchema.age,
      camperSchema.allergies,
    );
  }
}
