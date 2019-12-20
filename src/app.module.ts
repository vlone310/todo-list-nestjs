import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/todos.module';
import { Todo } from './users/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "todolistDatabase",
      entities: [Todo],
      synchronize: true
    }),
    UsersModule
  ],
})
export class AppModule {}
