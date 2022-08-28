import {
  Get,
  Controller,
  Render,
  UseFilters,
  Request,
  UseGuards,
  Res,
  Param,
  NotFoundException,
} from '@nestjs/common';
//   import { AuthExceptionFilter } from './auth-exceptions.filter';
//   import { AuthenticatedGuard } from './auth/authenticated.guard';
import { Response } from 'express';
import { PostService } from '../post/post.service';
//   import { Role } from './enums/role.enum';

@Controller('admin')
export class AdminPostController {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(AuthenticatedGuard)
  @Get('/')
  @Render('layouts/admin')
  admin(@Request() req) {
    // var user_info = req.session.passport.user;
    // var isAdmin = user_info.role === Role.ADMIN

    return {
      whichPartial: function () {
        return 'adminUserGroup';
      },
    };
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('/create-post')
  @Render('layouts/admin')
  async news(@Request() req) {
    // var user_info = req.session.passport.user;
    // var isAdmin = user_info.role === Role.ADMIN
    
    return {
      whichPartial: function () {
        return 'adminPostCreate';
      },
        isCreateMode: true,
        message: req.flash('message') ,
        content: req.flash('content') ,
        title: req.flash('title') ,
        sub_title: req.flash('sub_title') ,
        status_create: req.flash('status_create')
    };
  }

  @Get('edit-post/:post_id')
  @Render('layouts/admin')
  async edit(@Request() req, @Param('post_id') post_id: string) {
    // var user_info = req.session.passport.user;
    // var isAdmin = user_info.role === Role.ADMIN
    var result = await this.postService.findOneByPostId(parseInt(post_id));
    if(!result){
      throw new NotFoundException();
    }
    return {
      whichPartial: function () {
        return 'adminPostCreate';
      },
        isCreateMode: false,
        message: req.flash('message') ,
        post_id: post_id,
        content: result.content ,
        title: result.title,
        sub_title: result.sub_title,
        status_create: req.flash('status_create')
    };
  }


  @Get('/news')
  @Render('layouts/admin')
  async createNew(@Request() req) {
    // var user_info = req.session.passport.user;
    // var isAdmin = user_info.role === Role.ADMIN
    const news = await this.postService.findAll();
    return {
      whichPartial: function () {
        return 'adminPostList';
      },
      data : news
    };
  }
}
