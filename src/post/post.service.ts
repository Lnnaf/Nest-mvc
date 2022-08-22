import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { PostDto } from './dto/post.dto';
import { MongoRepository } from "typeorm";
import { PostEntity } from './entities/post.entity';
import slugify from 'slugify';
import { CouterSeqService } from '../couter-seq/couter-seq.service';
import { Message } from '../model/message.model';
import { ResponseStatus } from '../enums/response.status.enum';
import { writeFile } from 'fs';
import { UlityService } from '../ulity/ulity.service';

const POST_SEQ_NAME ='post_seq';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: MongoRepository<PostEntity>,
    private readonly couterSeqService: CouterSeqService,
    private ulityService: UlityService
  ){}
 
  async create(postDto: PostDto): Promise<any>{
    let dateTime = new Date();
    postDto.create_at = dateTime;
 
    const slug_title = this.slugifyTitle(postDto.title);
  
    if(await this.findOneByUrlTitle(slug_title)){
      return new Message(ResponseStatus.E, `title duplicate: ${slug_title}`);  
    }else{
      postDto.url_title = slug_title;
    }
    postDto.content = await (this.saveImage(postDto.content, postDto.url_title));

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

  async findOneByUrlTitle(url_title: string): Promise<PostEntity> {
    return this.repository.findOneBy({
      where: { url_title: url_title}
    });
  }

  async findOneByPostId(_post_id: number): Promise<PostEntity> {
    return this.repository.findOneBy({
      where: { post_id: _post_id}
    });
  }

  async update(postDto: PostDto): Promise<any> {
    const orignal_post = await this.findOneByPostId(postDto.post_id);
      if(orignal_post){
        const update_post = this.converPostDtoToEntity(postDto);
        update_post._id = orignal_post._id;
        return this.repository.save(update_post);
      }else{
        return new Message(ResponseStatus.E, `post_id ${postDto.post_id} not found`);
      } 
  }

  async remove(post_id: number) {
    const orignal_post = await this.findOneByPostId(post_id);
    if(orignal_post){
      return this.repository.remove(orignal_post);
    }else{
      return new Message(ResponseStatus.E, `post_id ${post_id} not found`);
    } 
  }

  converPostDtoToEntity(postDto: PostDto): PostEntity{
    const postEntity = new PostEntity();

    postEntity.post_id = postDto.post_id;
    postEntity.content = postDto.content;
    postEntity.sub_title = postDto.sub_title;
    postEntity.title = postDto.title;
    postEntity.url_title = this.slugifyTitle(postDto.title);
    postEntity.create_at = postDto.create_at;
    postEntity.last_edit_at = postDto.last_edit_at;
    postEntity.last_edit_by = postDto.last_edit_by;

    return postEntity;
  }

  slugifyTitle(title: string): string {
    return slugify(title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: true,
      locale: "vi",
      trim: true
    });
  }

  async saveImage(rawContent: string, post_name: string): Promise<string>{
      var base64Imgs = this.ulityService.getBase64Data(rawContent);
      if(!base64Imgs){
        return null;
      }
      var img_paths = [];
      for (var i = 0; i < base64Imgs.length;i++) {
        img_paths.push(this.ulityService.saveImage(base64Imgs[i], i, post_name));
      }
      return this.ulityService.replaceBase64(rawContent, img_paths);

  }
}
