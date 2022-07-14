import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UlityModule } from "src/ulity/ulity.module";
import { UlityService } from "src/ulity/ulity.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UlityService],
    exports: [UserService]
})
export class UserModule {}