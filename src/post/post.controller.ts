import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, UseGuards, Res, Req, Render } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response, Request } from 'express';
import { ResponseStatus } from 'src/enums/response.status.enum';

interface IRequestFlash extends Request {
  flash: any;
}
@Controller('api/news')
export class PostController {
  constructor(private readonly postService: PostService) {}
  

  @Post('create')
  async create(@Body() postDto: PostDto, @Res() res: Response, @Req() req: IRequestFlash) {
    const backup_obj = postDto;
    var result = await this.postService.create(postDto)
    
    req.flash('isCreateMode', true)
    req.flash('message', result.message)
    req.flash('status_create',result.status);
    req.flash('content', result.status == ResponseStatus.SUCCESS ? null : backup_obj.content);
    req.flash('title', result.status == ResponseStatus.SUCCESS ? null : backup_obj.title);
    req.flash('sub_title', result.status == ResponseStatus.SUCCESS ? null : backup_obj.sub_title);
    
    res.redirect('back');
    
  }
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll( 
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  //   @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number): Promise<PostEntity[]>{

  //   return this.postService.findAll(page, limit);
  // }

  @Get()
  findAll( 
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number): Promise<PostEntity[]>{

    return this.postService.findAll();
  }


  @Get(':url_title')
  findOne(@Param('url_title') url_title: string) {
    return this.postService.findOneByUrlTitle(url_title);
  }

  @Post('update')
  update(@Body() postDto: PostDto) {
    return this.postService.update(postDto);
  }

  @Get('delete/:post_id')
  remove(@Param('post_id') post_id: string, @Res() res: Response) {
    this.postService.remove(parseInt(post_id));
    res.redirect('back');
  }
}
