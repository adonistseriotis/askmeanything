import { Controller, Get, Render, Res, Req, HttpStatus, Query, Post, Body, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express'
import { QuestionsService } from './questions.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { NextService } from '@nestpress/next';
import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';
import { AuthService } from 'src/auth/auth.service';

const url = require('url');

@Controller()
export class QuestionsController {
  constructor(
    private readonly questionService: QuestionsService, 
    private readonly analyticsService: AnalyticsService,
    private readonly authService: AuthService,
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

  @UseGuards(JwtAuthGuard)
  @Post('answer')
  async answer(@Body() body, @Res() res: Response, @Req() req: Request){
    const {username} = await this.authService.getUser(req?.cookies?.Authentication)
    const questionID =  await this.questionService.answer(body.qid, body.body, username)

    res.redirect(url.format({
      pathname: '/question',
      query: { id: questionID}
    }))
  }

  @Get('home')
  async getLandingPage(@Req() req: IncomingMessage, @Res() res: ServerResponse, @Req() exreq: Request) {
    const user = await this.authService.getUser(exreq?.cookies?.Authentication)
    const questionFeed = await this.questionService.questionFeed();
    const questionsPerDay = await this.analyticsService.questionsPerDay()
    const questionsPerKeyword = await this.analyticsService.questionsPerKeyword()

    // console.log(questionFeed)

    const data = {
      questionFeed: questionFeed,
      questionsPerDay: questionsPerDay,
      questionsPerKeyword: questionsPerKeyword,
      username: user?.username 
    };

    await this.next.render('/views/LandingView', data, req, res)
  }

  @Post('search')
  async search(@Body() body, @Req() req: IncomingMessage, @Res() res: Response) {
    console.log('Body', body.filter)
    const questionFeed = await this.questionService.search(body.filter);
    console.log(questionFeed)
    res.status(200).send( {
      questionFeed: questionFeed
    })
    // await this.next.render('/views/LandingView', data, req, res)
  }

  @Get('create-question')
  async getCreateQuestion(@Req() req: IncomingMessage, @Res() res: ServerResponse){
    const keywords = await this.questionService.getKeywords();
    const data = {
      dbKeywords: keywords
    }
    await this.next.render('/views/CreateQuestion', data, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-question')
  async createQuestion(@Body() body, @Res() res : Response, @Req() req: Request){
    const {username} = await this.authService.getUser(req?.cookies?.Authentication)
    const questionID = await this.questionService.createQuestion(body.title, body.body, username, body.keywords)

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

  @UseGuards(JwtAuthGuard)
  @Post('update-question')
  async updateQuestion(@Body() body, @Res() res : Response, @Req() req: Request){
    const {username} = await this.authService.getUser(req?.cookies?.Authentication)
    await this.questionService.updateQuestion(body.id, body.title, body.body, username, body.keywords)

    res.redirect(url.format({
      pathname: '/question',
      query: { id: body.id}
    }))
  }
}