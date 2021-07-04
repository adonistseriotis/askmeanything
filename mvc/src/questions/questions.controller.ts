import { Controller, Get, Render, Res, HttpStatus, Query, Post, Body } from '@nestjs/common';
import { Response } from 'express'
import { QuestionsService } from './questions.service';
const url = require('url');

@Controller()
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get('question')
  @Render('Question')
  async findOne(@Query() query) {
    // console.log('QUERY', query)
    const question = await this.questionService.findOne(query.id)
    if(!question){
        return HttpStatus.NOT_FOUND
    }
    return {
      question: question
    };
  }

  @Post('answer')
  async answer(@Body() body, @Res() res: Response){
    const questionID =  await this.questionService.answer(body.qid, body.body, body.username)
    
    res.redirect(url.format({
      pathname: '/question',
      query: { id: questionID}
    }))
  }
}