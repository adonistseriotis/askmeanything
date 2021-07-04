import { Controller, Get, Render, Param, HttpStatus, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';

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
}