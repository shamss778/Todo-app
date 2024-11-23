import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Like } from "typeorm";
import { TodoEntity } from "./entity/todoEntity";
import { Repository } from "typeorm";
import { AddToDoDTO } from "./dto/addtododto";
import { UpdateToDoDTO } from "./dto/updatetododto";
import { TodoStatusEnum } from "./TodoStatusEnum";

@Injectable()
export class TodoService {
    constructor (
        @InjectRepository(TodoEntity) 
        private readonly todoRepository: Repository<TodoEntity>,
    ) {}

    async addTodo(newTodo: AddToDoDTO){
        const todo = this.todoRepository.create(newTodo);
        return await this.todoRepository.save(todo);
    }

    async updateTodo(updated: UpdateToDoDTO){
        const { id, name, description, status } = updated;
    
    
        const todo = await this.todoRepository.findOne({ where: { id } });
        
        if (!todo) {
        throw new Error('Todo not found'); // Customize this to your error handling approach
        }

        todo.name = name ?? todo.name; // Only update if a new value is provided
        todo.description = description ?? todo.description;
        todo.status = status ?? todo.status;

        return await this.todoRepository.save(todo);
    }

    async deleteTodo(id :number){
        return await this.todoRepository.delete(id);
    }

    async softDeleteTodo(id :number){
        return await this.todoRepository.softDelete(id);
    }

    async restoreTodo(id:number){
        return await this.todoRepository.restore(id);
    } 

    async countTodosByStatus(status: TodoStatusEnum): Promise<number> {
        return await this.todoRepository.count({ where: { status } });
    }

    async getAll(string?: string,
                 status?: TodoStatusEnum,
                 page: number = 1, 
                 limit: number = 10): Promise<TodoEntity[]> {
        const query = this.todoRepository.createQueryBuilder('todo');
    
        if (string) {
            query.andWhere(
                '(todo.name LIKE :string OR todo.description LIKE :string)',
                { string: `%${string}%` },
            );
        }
    
        if (status) {
            query.andWhere('todo.status = :status', { status });
        }

        query.skip((page - 1) * limit); // Skip the results of the previous pages
        query.take(limit); // Limit the results to the page size
    
        return await query.getMany();
    }

    async getById(id: number): Promise<TodoEntity[]> {
        return await this.todoRepository.find({where:{id:id}})
    }

    }