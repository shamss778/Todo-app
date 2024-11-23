import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { v4 as uuidv4 } from 'uuid'
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DateEntity } from "src/common/DateEntity";
import { TodoEntity } from "./entity/todoEntity";

@Module({
    imports:[
        TypeOrmModule.forFeature([DateEntity,TodoEntity]),
        ConfigModule.forRoot({isGlobal: true,}),
        TypeOrmModule.forRootAsync({
            useFactory: async () => ({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [DateEntity, TodoEntity], // You can add other entities here if needed
                synchronize: true,
            }),
        }),
    ],
    //exports:[TodoController,TodoService],
    controllers:[TodoController],
    providers:[TodoService,
        {
            provide: 'UUID',
            useValue: uuidv4,
        }
    ],
})
export class TodoModule {}