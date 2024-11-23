import {IsNotEmpty, isString, IsString, MaxLength, MinLength} from 'class-validator'
import { ValidationMessages } from 'src/common/ValidationMessages';

export class AddToDoDTO {

    @IsNotEmpty({
        message: ValidationMessages.required
    })
    @MinLength(3,{
        message: ValidationMessages.minLength
    }
    )
    @MaxLength(10,{
        message: ValidationMessages.maxLength
    })
    name: string;

    @IsNotEmpty({
        message: ValidationMessages.required
    })
    @MinLength(10, {
        message: ValidationMessages.minLength
    })
    description: string;
    
}