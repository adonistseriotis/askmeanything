import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionsModule } from './questions/questions.module';
import * as dbConfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig),RenderModule, AuthModule, UsersModule, QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
