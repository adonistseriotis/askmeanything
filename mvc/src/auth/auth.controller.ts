import { Controller, Get, Render, Res, Req, HttpStatus, Query, Post, Body, UseGuards } from '@nestjs/common';
import { NextService } from '@nestpress/next';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import {
    IncomingMessage,
    ServerResponse,
  } from 'http';
import { JwtAuthGuard } from './auth.jwtGuard';

const url = require('url');

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly next: NextService,
  ) {}

  @Get('login')
  async getLogin(@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    await this.next.render('/views/login', req, res)
  }

  @Post('login')
  async login(@Body() body,@Req() req: Request, @Req() req1: IncomingMessage, @Res() res1: ServerResponse, @Res() res: Response){
    const authorized = this.authService.validate(body.username, body.password)
    if(!authorized)
      await this.next.render('views/login', {error: true, message: 'Invalid user'},  req1, res1)
    else{
      const cookie = this.authService.getCookieWithJwtToken(body.username);
      res.setHeader('Set-Cookie', cookie);
      res.redirect('/home');
    }
  }

  @Get('signup')
  async getSignup(@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    await this.next.render('/views/signup', req, res)
  }

  @Post('signup')
  async signup(@Body() body,@Req() req: Response, @Req() req1: IncomingMessage, @Res() res1: ServerResponse, @Res() res: Response) {
    const user = await this.authService.signup(body)
    const authorized = this.authService.validate(user.username, user.password)
    if(!authorized)
      await this.next.render('views/signup', {error: true, message: 'Something went wrong'},  req1, res1)
    else{
      const cookie = this.authService.getCookieWithJwtToken(body.username);
      res.setHeader('Set-Cookie', cookie);
      res.redirect('/home');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Req() req: Request, @Res() res: Response){
    // console.log('Yolo',req.cookies.Authentication)
    const user = await this.authService.getUser(req?.cookies?.Authentication)  
    user.password = undefined

    res.status(200).send(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req : Request, @Res() res: Response) {
    const cookie = await this.authService.getCookieForLogOut()
    res.setHeader('Set-Cookie', cookie);
    // return res.sendStatus(200);
    console.log('Im here')
    res.redirect(url.format({
      pathname: '/'
    }))
  }
}
