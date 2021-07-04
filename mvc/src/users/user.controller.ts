import { Controller, Get, Render, Param, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @Render('Users')
  async findOne(@Query() query) {
    // console.log('QUERY', query)
    const user = await this.usersService.findOne(query.username)
    if(!user){
        return HttpStatus.NOT_FOUND
    }
    return {
      user: user
    };
  }
}