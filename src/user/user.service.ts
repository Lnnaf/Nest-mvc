import { HttpCode, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, ObjectID } from "typeorm";
import { UserDTO } from "./user.dto";
import { UlityService } from "src/ulity/ulity.service";
import { ResponseStatus } from "src/enums/response.status.enum";
import { Message } from "src/model/message.model";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private ulityService: UlityService){};

    async findAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    async insertUser(user: UserDTO): Promise<User>{
        return this.userRepository.save(user);
    }

    async update(user: UserDTO): Promise<Message> {
        const objID = this.ulityService.toObjectID(user._id);
        const userUpdate = this.userRepository.create(user);
        userUpdate._id = objID;

        const result = (await this.userRepository.update(objID, userUpdate));
        
        const message = result.affected === 1 ? new Message(ResponseStatus.S, "success!") : new Message(ResponseStatus.E, "not effected!");
        return message;
    }

    async delete(user: UserDTO): Promise<any> {
        const objID = this.ulityService.toObjectID(user._id);
        const userDelete = this.userRepository.create(user);
        userDelete._id = objID;
        const result = (await this.userRepository.delete(userDelete));

        const message = result.affected === 1 ? new Message(ResponseStatus.S, "success!") : new Message(ResponseStatus.E, "not effected!");
        return message;
    }
}