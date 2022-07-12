import {Column, Entity, ObjectIdColumn, ObjectID} from 'typeorm'

@Entity()
export class PostEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;

    @Column()
    sub_title: string;

    @Column()
    url_title: string;

    @Column()
    content: string;

    @Column()
    create_at: Date;

    @Column()
    last_edit_at: Date;

    @Column()
    last_edit_by: string;
}
