import { Module } from '@nestjs/common';
import { ObjectID } from "typeorm";
import { UlityService } from './ulity.service';
var mongoose = require('mongoose');

@Module({
    providers: [UlityService]
})
export class UlityModule {}

