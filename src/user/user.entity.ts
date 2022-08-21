import {Column, Entity, ObjectIdColumn, ObjectID} from 'typeorm'

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    username: string;

    @Column()
    display_name: string;

    @Column()
    password: string;

    @Column()
    role: string;

}