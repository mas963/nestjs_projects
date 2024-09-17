import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCampersQuery } from './get-campers.query';
import { CamperDtoRepository } from '../../db/camper-dto.repository';
import { CamperDto } from '../../camper.dto';

@QueryHandler(GetCampersQuery)
export class GetCampersHandler implements IQueryHandler<GetCampersQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute(): Promise<CamperDto[]> {
    return this.camperDtoRepository.findAll();
  }
}
