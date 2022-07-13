import { Module } from '@nestjs/common';
import { PostModule } from 'src/model/post/post.module';
import { PostService } from 'src/model/post/post.service';
import { ObjectID } from "typeorm";
import { UlityService } from './ulity.service';
var mongoose = require('mongoose');

@Module({
    imports: [PostModule],
    providers: [UlityService],
    exports: [UlityService]
})
export class UlityModule {}

