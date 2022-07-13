import { Injectable } from '@nestjs/common';
import { CouterSeq } from './entities/couter-seq.entity';
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import console from 'console';

@Injectable()
export class CouterSeqService {
  constructor(@InjectRepository(CouterSeq)
  private readonly repository: MongoRepository<CouterSeq>){}
  
  async create(default_seq_number: number, seq_name: string): Promise<CouterSeq> {
    const default_seq = this.repository.create();
    default_seq.seq_num = default_seq_number;
    default_seq.seq_name = seq_name;
    return this.repository.save(default_seq);
  }

  async findOne(seq_name: string): Promise<CouterSeq> {
    return this.repository.findOneBy({
      where: { seq_name: seq_name}
    });
  }

  async increament(seq_name: string): Promise<any> {
    const current_seq = (await this.findOne(seq_name));
    if(current_seq) {
      current_seq.seq_num = current_seq.seq_num +1;
    }
    return this.repository.save(current_seq);
  }

}
