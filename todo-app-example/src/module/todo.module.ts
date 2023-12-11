import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { TodosController } from 'src/controller/todo.controller';
import { TodosService } from 'src/provider/todo.service';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    controllers: [TodosController],
    providers: [TodosService],
})

export class TodosModule { }