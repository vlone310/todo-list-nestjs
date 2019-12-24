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
  async create(@Body() todo: Todo) {
    const res = await this.service.createTodo(todo);
    return this.service.getOneTodo(res.raw.insertId);
  };

  @Put(':id')
  async update(@Param() params: any, @Body() todo: Todo) {
    await this.service.updateTodo(params.id, todo);
    return this.service.getOneTodo(params.id);
  };

  @Delete(':id')
  delete(@Param() params) {
    return this.service.deleteTodo(params.id);
  };

  @Delete()
  deleteAllTodos() {
    this.service.deleteAll();
  }
}
