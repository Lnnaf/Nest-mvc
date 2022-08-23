import { Injectable } from '@nestjs/common';
import { ObjectID } from "typeorm";
var mongoose = require('mongoose');
import {writeFile} from 'fs'

@Injectable()
export class UlityService {
    constructor() {   
    }
    
    /**
     * Convert String id to ObjectID
     * @param id String id
     * @returns ObjectID
     */
    toObjectID(id: string): ObjectID{
        return mongoose.Types.ObjectId(id);   
    }

    getBase64Data(rawContent: string): string[]{
        let result = [];
        let rawImage64 =  rawContent.match(new RegExp('data:\([^"]+\)*','g'));
        if(!rawImage64){
            return null
        }
        for (let i = 0; i < rawImage64.length; i++){
            result.push(rawImage64[i].split(';base64,').pop())
        };
        return result;
    }

    replaceBase64(rawContent: string, img_paths: string[]): string{
        let regex = new RegExp('data:\([^"]+\)*','g');
        let rawImage64 =  rawContent.match(regex);
        console.log(rawImage64.length);
        for (let i = 0; i < rawImage64.length; i++){
            rawContent =  rawContent.replace(rawImage64[i], img_paths[i])
        };
        return rawContent;
    }

    saveImage(imgBase64: string, index: number, name: string): string{
        let path = 'public/uploads/images/'+name+'_'+index+'.png'
        writeFile(path, imgBase64, {encoding: 'base64'}, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`File ${name}_${index}.png created`); 
            } 
          });
          return '../'+path;
    }

}