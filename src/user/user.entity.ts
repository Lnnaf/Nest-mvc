import {Column, Entity, ObjectIdColumn, ObjectID} from 'typeorm'

@Entity()
export class User {
    constructor(
        _id?: ObjectID, 
        name?: string,
        email?: string){
            this._id = _id;
            this.name = name;
            this.email = email;
        }
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    name: string;
    @Column()
    email: string;
}