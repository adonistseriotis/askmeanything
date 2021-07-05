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
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig), 
    AuthModule, 
    UsersModule, 
    QuestionsModule, 
    AnalyticsModule, 
    NextModule,
  ],
  controllers: [
    AppController, 
    AnalyticsController, 
    AuthController
  ],
  providers: [
    AppService, 
    AnalyticsService, 
    QuestionsService, 
    AuthService, 
    UsersService,
    ConfigService,
  ],
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
