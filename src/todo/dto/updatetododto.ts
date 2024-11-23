import { IsNotEmpty, MinLength, MaxLength, IsEnum } from "class-validator";
import { ValidationMessages } from "src/common/ValidationMessages";
import { TodoStatusEnum } from "../TodoStatusEnum";

export class UpdateToDoDTO {

    @MinLength(3,{
        message: ValidationMessages.minLength
    }
    )
    @MaxLength(10,{
        message: ValidationMessages.maxLength
    })
    name: string;


    @MinLength(10, {
        message: ValidationMessages.minLength
    })
    description: string;  
    
    id: number;

    @IsEnum(TodoStatusEnum, {
        message: ValidationMessages.enum
    })
    status: TodoStatusEnum;

}