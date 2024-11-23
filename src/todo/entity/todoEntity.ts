import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TodoStatusEnum } from "../TodoStatusEnum";
import { DateEntity } from "../../common/DateEntity"

@Entity('todo')
export class TodoEntity extends DateEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type:'enum', enum: TodoStatusEnum , default: TodoStatusEnum.waiting})
    status: TodoStatusEnum;


}