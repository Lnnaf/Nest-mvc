import { Controller, UseGuards, Post,UseFilters, Res} from '@nestjs/common';
import { AuthExceptionFilter } from 'src/auth-exceptions.filter';
import { LocalAuthGuard } from './local.auth.guard';
import { Response } from 'express';

@Controller('/auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Res() res: Response) {
    res.redirect('/admin');
  }
  
}
