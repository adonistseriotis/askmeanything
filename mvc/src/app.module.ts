import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import {
  NextModule,
  NextMiddleware,
} from '@nestpress/next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionsModule } from './questions/questions.module';
import { AnalyticsService } from './analytics/analytics.service';
import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsModule } from './analytics/analytics.module';
import * as dbConfig from '../ormconfig';
import { QuestionsService } from './questions/questions.service';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule, UsersModule, QuestionsModule, AnalyticsModule, NextModule
  ],
  controllers: [AppController, AnalyticsController],
  providers: [AppService, AnalyticsService, QuestionsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(NextMiddleware)
    .forRoutes({
      path: '_next*',
      method: RequestMethod.GET
    });

    consumer
    .apply(NextMiddleware)
    .forRoutes({
      path: 'images/*',
      method: RequestMethod.GET,
    });

    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: 'favicon.ico',
        method: RequestMethod.GET,
      });
  }
}
