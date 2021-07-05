import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { AnalyticsService } from '../analytics/analytics.service';
import { NextModule } from '@nestpress/next';
import { AuthService } from '..//auth/auth.service';
import { UsersService } from '..//users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'entities/Users';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AnalyticsModule, NextModule, ConfigModule, AuthModule, UsersModule, TypeOrmModule.forFeature([Users])],
  providers: [QuestionsService, AnalyticsService, UsersService, AuthService, ConfigService],
  controllers: [QuestionsController]
})
export class QuestionsModule {}
