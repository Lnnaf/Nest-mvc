import {
  Get,
  Controller,
  Render,
  UseFilters,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthExceptionFilter } from './auth-exceptions.filter';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { Response } from 'express';
import { Role } from './enums/role.enum';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  @Get()
  @Render('layouts/index')
  root() {
    return {
      overview: {
        name1: 'The Global City',
        name2: '	Khu đô thị Sài Gòn Bình An',
        address:
          '	Đường Đỗ Xuân Hợp, phường An Phú, thành phố Thủ Đức, thành phố Hồ Chí Minh',
      },
    };
  }

  @Get('/404')
  @Render('layouts/error404')
  notFoundPage() {
    return {};
  }

  @Get('/login')
  @Render('layouts/login')
  login(@Request() req) {
      return { 
        message: req.flash('loginError') ,
        isLoginFailed: req.flash('isLoginFailed')
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/admin')
  @Render('layouts/admin')
  admin(@Request() req) {
    var user_info = req.session.passport.user;
    var isAdmin = user_info.role === Role.ADMIN
    var roles = Object.values(Role);
    return {
      roles,
      user_info,
      isAdmin,
      message: 'hehehe',
    };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.session.destroy();
    res.redirect('/login')
  }
}
