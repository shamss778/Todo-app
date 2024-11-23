import { Controller } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Body, Param, Post, Put } from "@nestjs/common";
import { AddToDoDTO } from "./dto/addtododto";
import { Todo } from "./entity/todo";
import { TodoEntity } from "./entity/todoEntity";
import { UpdateToDoDTO } from "./dto/updatetododto";


@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post('/add')
    addTodo(@Body() newTodo: AddToDoDTO,): Todo{
        return (<Todo><unknown>this.todoService.addTodo(newTodo));
    } 

    @Put(':id')
    async updateTodo(
        @Param('id') id: number,
        @Body() updatedtodo: UpdateToDoDTO,
    ): Promise<TodoEntity> {
        return this.todoService.updateTodo({ ...updatedtodo, id });

        }
}