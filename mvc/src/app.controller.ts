import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { QuestionsService } from './questions/questions.service';
import { Response } from 'express'
const url = require('url');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly questionService: QuestionsService) {}

  @Get()
  getLandingPage(@Res() res: Response) {
    res.redirect(url.format({
      pathname:'/home'
    }))
  }
}