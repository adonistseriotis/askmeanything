import { Controller, Get, Render, Res, Req, HttpStatus, Query, Post, Body } from '@nestjs/common';
import { Response } from 'express'
import { QuestionsService } from './questions.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { NextService } from '@nestpress/next';
import {
  IncomingMessage,
  ServerResponse,
} from 'http';

const url = require('url');

@Controller()
export class QuestionsController {
  constructor(
    private readonly questionService: QuestionsService, 
    private readonly analyticsService: AnalyticsService,
    private readonly next: NextService) {}

  @Get('question')
  async findOne(@Query() query,@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    // console.log('QUERY', query)

    if(!Number.isInteger(parseInt(query.id)))
      return HttpStatus.NOT_FOUND
    const question = await this.questionService.findOne(query.id)
    if(!question){
        return HttpStatus.NOT_FOUND
    }
    const data =  {
      question: question
    };
    await this.next.render('/views/Question', data, req, res)
  }

  @Post('answer')
  async answer(@Body() body, @Res() res: Response){
    const questionID =  await this.questionService.answer(body.qid, body.body, body.username)

    res.redirect(url.format({
      pathname: '/question',
      query: { id: questionID}
    }))
  }

  @Get('home')
  async getLandingPage(@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    const questionFeed = await this.questionService.questionFeed();
    const questionsPerDay = await this.analyticsService.questionsPerDay()
    const questionsPerKeyword = await this.analyticsService.questionsPerKeyword()

    // console.log(questionFeed)

    const data = {
      questionFeed: questionFeed,
      questionsPerDay: questionsPerDay,
      questionsPerKeyword: questionsPerKeyword
    };

    await this.next.render('/views/LandingView', data, req, res)
  }

  @Post('search')
  async search(@Body() body, @Req() req: IncomingMessage, @Res() res: ServerResponse) {
    const questionFeed = await this.questionService.search(body.filter);
    const questionsPerDay = await this.analyticsService.questionsPerDay()
    const questionsPerKeyword = await this.analyticsService.questionsPerKeyword()
    console.log(questionFeed)
    const data =  {
      questionFeed: questionFeed,
      questionsPerDay: questionsPerDay,
      questionsPerKeyword: questionsPerKeyword
    }
    await this.next.render('/views/LandingView', data, req, res)
  }

  @Get('create-question')
  async getCreateQuestion(@Req() req: IncomingMessage, @Res() res: ServerResponse){
    const keywords = await this.questionService.getKeywords();
    const data = {
      dbKeywords: keywords
    }
    await this.next.render('/views/CreateQuestion', data, req, res)
  }

  @Post('create-question')
  async createQuestion(@Body() body, @Res() res : Response){
    const questionID = await this.questionService.createQuestion(body.title, body.body, body.username, body.keywords)

    res.redirect(url.format({
      pathname: '/question',
      query: { id: questionID}
    }))
  }

  @Get('update-question')
  async getUpdateQuestion(@Query() query, @Req() req: IncomingMessage, @Res() res: ServerResponse){
    if(!Number.isInteger(parseInt(query.id)))
      return HttpStatus.NOT_FOUND
    const question = await this.questionService.findOne(query.id)
    const keywords = await this.questionService.getKeywords();
    if(!question){
        return HttpStatus.NOT_FOUND
    }
    const data =  {
      question: question,
      DBkeywords: keywords
    };
    await this.next.render('/views/UpdateQuestion', data, req, res)
  }

  @Post('update-question')
  async updateQuestion(@Body() body, @Res() res : Response){
    await this.questionService.updateQuestion(body.id, body.title, body.body, body.username, body.keywords)

    res.redirect(url.format({
      pathname: '/question',
      query: { id: body.id}
    }))
  }
}