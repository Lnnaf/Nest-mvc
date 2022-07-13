import {Column, Entity, ObjectIdColumn, ObjectID} from 'typeorm'

@Entity()
export class CouterSeq {
    @ObjectIdColumn()
    _id: string;

    @Column()
    seq_name: string;

    @Column()
    seq_num: number;
}
