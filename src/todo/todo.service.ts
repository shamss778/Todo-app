import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity } from "./entity/todoEntity";
import { Repository } from "typeorm";
import { AddToDoDTO } from "./dto/addtododto";
import { UpdateToDoDTO } from "./dto/updatetododto";

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

    }