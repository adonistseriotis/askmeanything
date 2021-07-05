import { Module } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';

@Module({
  providers: [AnalyticsService]
//   controllers: [QuestionsController]
})
export class AnalyticsModule {}
