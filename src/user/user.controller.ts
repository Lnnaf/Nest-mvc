import { Body, Controller, Get, Post, Res, HttpStatus, Req } from "@nestjs/common";
import { UserDTO } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Message } from "../model/message.model";
import { ResponseStatus } from "../enums/response.status.enum";
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){};

    @Get()
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Post('/create')
    insert(@Body() user: UserDTO): Promise<User>{
        return this.userService.insertUser(user)
    }

    
    // @Post('/update')
    // update(@Body() user: UserDTO): Promise<Message>{
    //     return this.userService.update(user);  
    // }

    // @Post('/delete')
    // delete(@Body() user: UserDTO): Promise<Message>{
    //     return this.userService.delete(user);
    // }

}
