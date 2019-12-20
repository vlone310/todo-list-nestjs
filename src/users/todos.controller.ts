import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {

  constructor(private service: TodosService) {}

  @Get()
  get() {
    return this.service.getTodos();
  };

  @Get(':id')
  getOne(@Param() params) {
    return this.service.getOneTodo(params.id);
  };

  @Post()
  create(@Body() todo: Todo) {
    return this.service.createTodo(todo);
  };

  @Put(':id')
  update(@Param() params: any, @Body() todo: Todo) {
    return this.service.updateTodo(params.id, todo);
  };

  @Delete(':id')
  delete(@Param() params) {
    return this.service.deleteTodo(params.id);
  };
}
