import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CamperDto } from './camper.dto';
import { GetCampersQuery } from './queries/get-campers/get-campers.query';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { CreateCamperCommand } from './commands/create-camper/create-camper.command';
import { UpdateCamperAllergiesRequest } from './dto/request/update-camper-allergies-request.dto';
import { UpdateAllergiesCommand } from './commands/update-allergies/update-allergies.command';

@Controller('campers')
export class CampersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCamper(@Param('id') camperId: string): Promise<void> {}

  @Get()
  async getCampers(): Promise<CamperDto[]> {
    return this.queryBus.execute<GetCampersQuery, CamperDto[]>(
      new GetCampersQuery(),
    );
  }

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest),
    );
  }

  @Patch(':id/allergies')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest,
  ): Promise<void> {
    await this.commandBus.execute<UpdateAllergiesCommand, void>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesRequest.allergies,
      ),
    );
  }
}
