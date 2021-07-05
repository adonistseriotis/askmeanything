import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import {
  Controller,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { NextService } from '@nestpress/next';
import { Response } from 'express'
const url = require('url');

@Controller()
export class AppController {
  constructor(
    private readonly next: NextService,
  ) {}

  @Get()
  getLandingPage(@Res() res: Response) {
    res.redirect(url.format({
      pathname:'/home'
    }))
  }
}