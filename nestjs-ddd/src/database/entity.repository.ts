import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { AggregateRoot } from '@nestjs/cqrs';
import { FilterQuery, Model } from 'mongoose';
import { EntitySchemaFactory } from './entity-schema.factory';
import { NotFoundException } from '@nestjs/common';

export abstract class EntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  protected async findOne(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const entityDocument = await this.entityModel.findOne(
      entityFilterQuery,
      {},
      { lean: true },
    );

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  protected async find(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity[]> {
    return (
      await this.entityModel.find(entityFilterQuery, {}, { lean: true })
    ).map(entityDocument =>
      this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }

  async create(entity: TEntity): Promise<void> {
    await new this.entityModel(this.entitySchemaFactory.create(entity)).save();
  }

  protected async findOneAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<void> {
    const updatedEntityDocument = await this.entityModel
      .findOneAndReplace(
        entityFilterQuery,
        this.entitySchemaFactory.create(entity), // Doğrudan entity nesnesini geçiyoruz
        {
          returnDocument: 'after', // new: true yerine kullanılır
        },
      )
      .lean(); // lean() kullanarak sonuçları optimize edilmiş plain JavaScript objesine dönüştürüyoruz

    if (!updatedEntityDocument) {
      throw new NotFoundException('Unable to find the entity to replace.');
    }
  }
}
