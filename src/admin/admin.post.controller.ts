import {
  Get,
  Controller,
  Render,
  UseFilters,
  Request,
  UseGuards,
  Res,
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
        message: req.flash('message') ,
        content: req.flash('content') ,
        title: req.flash('title') ,
        sub_title: req.flash('sub_title') ,
        status_create: req.flash('status_create')
    };
  }

  @Get('/news')
  @Render('layouts/admin')
  async createNew(@Request() req) {
    // var user_info = req.session.passport.user;
    // var isAdmin = user_info.role === Role.ADMIN
    const news = await this.postService.findAll();
    console.log(news.length);
    
    return {
      whichPartial: function () {
        return 'adminPostList';
      },
      data : news
    };
  }
}
