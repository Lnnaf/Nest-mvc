import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { PostDto } from './dto/post.dto';
import { MongoRepository } from "typeorm";
import { PostEntity } from './entities/post.entity';
import slugify from 'slugify';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: MongoRepository<PostEntity>,
  ){}

  async create(postDto: PostDto): Promise<PostEntity>{
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
  
    postDto.url_title = slug_title;
    return this.repository.save(postDto);
  }

  async findAll(page:number, limit:number): Promise<PostEntity[]>{
    console.log('page: '+page);
    console.log('limit: '+limit);
    return this.repository.find({order: { create_at: "DESC" }, take:limit, skip: (page -1)*limit});
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
