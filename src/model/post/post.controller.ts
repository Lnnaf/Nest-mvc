import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PostEntity } from './entities/post.entity';

@Controller('tin-tuc')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  create(@Body() postDto: PostDto) {
    return this.postService.create(postDto);
  }

  @Get()
  findAll( 
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number): Promise<PostEntity[]>{

    return this.postService.findAll(page, limit);
  }

  @Get(':url_title')
  findOne(@Param('url_title') url_title: string) {
    return this.postService.findOneByUrlTitle(url_title);
  }

  @Patch('update')
  update(@Body() postDto: PostDto) {
    return this.postService.update(postDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
