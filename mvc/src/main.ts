import { NestFactory } from '@nestjs/core';
import { NextModule } from '@nestpress/next';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.get(NextModule).prepare().then(() => {
    
    app.listen(8001, 'localhost', () => {
      console.log('> Ready on http://localhost:8001 with Next.js!');
    });
  });
}

bootstrap();
