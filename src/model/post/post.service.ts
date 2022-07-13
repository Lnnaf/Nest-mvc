import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { PostDto } from './dto/post.dto';
import { MongoRepository } from "typeorm";
import { PostEntity } from './entities/post.entity';
import slugify from 'slugify';
import { CouterSeqService } from 'src/couter-seq/couter-seq.service';
import { Message } from '../message.model';
import { ResponseStatus } from 'src/enums/response.status.enum';

const POST_SEQ_NAME ='post_seq';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: MongoRepository<PostEntity>,
    private readonly couterSeqService: CouterSeqService,
  ){}
 
  async create(postDto: PostDto): Promise<any>{
    let dateTime = new Date();
    postDto.create_at = dateTime;
   
    const slug_title = slugify(postDto.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: true,
      locale: "vi",
      trim: true
    });
  
    if(await this.findOne(slug_title)){
      return new Message(ResponseStatus.E, `title duplicate: ${slug_title}`);  
    }else{
      postDto.url_title = slug_title;
    }

    const current_post_seq_num = (await this.couterSeqService.findOne(POST_SEQ_NAME));
    if(!current_post_seq_num){
      postDto.post_id = (await this.couterSeqService.create(0, POST_SEQ_NAME)).seq_num;
    }else{
      postDto.post_id = parseInt((await this.couterSeqService.increament(POST_SEQ_NAME)).seq_num);
    }
    return this.repository.save(postDto);  
  }

  async findAll(page:number, limit:number): Promise<PostEntity[]>{
    return this.repository.find({
      order: { create_at: "DESC" }, 
      take: limit, 
      skip: (page -1)*limit});
  }

  async findOne(url_title: string): Promise<PostEntity> {
    return this.repository.findOneBy({
      where: { url_title: url_title}
    });
  }

  update(id: number, updatePostDto: PostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
