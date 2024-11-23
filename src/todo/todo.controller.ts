import { Controller, Delete, Get, Patch, Query } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Body, Param, Post, Put } from "@nestjs/common";
import { AddToDoDTO } from "./dto/addtododto";
import { Todo } from "./entity/todo";
import { TodoEntity } from "./entity/todoEntity";
import { UpdateToDoDTO } from "./dto/updatetododto";
import { TodoStatusEnum } from "./TodoStatusEnum";


@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post('/add')
    addTodo(@Body() newTodo: AddToDoDTO,): Todo{
        return (<Todo><unknown>this.todoService.addTodo(newTodo));
    } 

    @Put('/update/:id')
    async updateTodo(
        @Param('id') id: number,
        @Body() updatedtodo: UpdateToDoDTO,
    ): Promise<TodoEntity> {
        return this.todoService.updateTodo({ ...updatedtodo, id });
        }

    @Delete('/delete/:id')
    async deleteTodo(
        @Param('id') id: number,
    ): Promise<void> {
        await this.todoService.deleteTodo(id);
    }

    @Delete('/softDelete/:id')
    async softDeleteTodo(
        @Param('id') id:number,):
        Promise<void> {
            await this.todoService.softDeleteTodo(id);
        }
    
    @Patch('/restore/:id')
    async restoreTodo(
        @Param('id') id:number,
    ): Promise<void> {
        await this.todoService.restoreTodo(id);
    }

    @Get('count/:status')
    async countTodosByStatus(
        @Param('status') status: TodoStatusEnum,
    ): Promise<number> {
        return this.todoService.countTodosByStatus(status);
    }
    
    @Get('/get/all')
    async getAll(
        @Query('string') string?: string,
        @Query('status') status?: TodoStatusEnum,
        @Query('page') page: number = 1, // Default to page 1 if not provided
        @Query('limit') limit: number = 10,
): Promise<TodoEntity[]> {
    return this.todoService.getAll(string, status, page, limit);
}

    @Get('/get/:id')
    async getById(
        @Param('id') id: number,
        
    ): Promise<TodoEntity[]> {
        return this.todoService.getById(id);
    }

    

}