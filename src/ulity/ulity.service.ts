import { Injectable } from '@nestjs/common';
import { ObjectID } from "typeorm";
var mongoose = require('mongoose');

@Injectable()
export class UlityService {
    /**
     * Convert String id to ObjectID
     * @param id String id
     * @returns ObjectID
     */
    toObjectID(id: string): ObjectID{
        return mongoose.Types.ObjectId(id);   
    }

}