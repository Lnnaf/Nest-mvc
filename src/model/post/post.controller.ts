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
    return this.postService.findOne(url_title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: PostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
