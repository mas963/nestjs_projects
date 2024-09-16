import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { AggregateRoot } from '@nestjs/cqrs';
import { EntityRepository } from './entity.repository';
import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';

export abstract class BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ _id: new ObjectId(id) } as FilterQuery<TSchema>);
  }

  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    await this.findOneAndReplace(
      { _id: new ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }
}
