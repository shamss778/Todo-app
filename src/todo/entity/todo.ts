import { TodoStatusEnum } from "../TodoStatusEnum";

export class Todo {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    status: TodoStatusEnum;
}