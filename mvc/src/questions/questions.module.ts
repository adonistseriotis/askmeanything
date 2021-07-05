import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { AnalyticsService } from '../analytics/analytics.service';
import { NextModule } from '@nestpress/next';

@Module({
  imports: [AnalyticsService, NextModule],
  providers: [QuestionsService, AnalyticsService],
  controllers: [QuestionsController]
})
export class QuestionsModule {}
