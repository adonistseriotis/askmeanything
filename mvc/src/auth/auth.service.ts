import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './payload.interface';
import { Users } from 'entities/Users';

@Injectable()
export class AuthService {
    constructor( 
        private userService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    public async signup(user: Users) {
      try {
        const newUser = await this.userService.create(user);
        return newUser;
      } catch (error) {
        console.log(error)
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    
    public async validate(username: string, password: string) : Promise<boolean> {
        return this.userService.authorize(username, password);
    }

    public getCookieWithJwtToken(username: string) {
      const payload: TokenPayload = { username };
      const token = this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'JWT_EXPIRATION_TIME',
      )}`;
    }
    
    public getCookieForLogOut() {
      return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

    public async getUser(token: string) : Promise<Users>{
      try{
        if(!token)
          return null
        const payload = this.jwtService.decode(token)
        const usernameString = JSON.stringify(payload)
        const {username} = JSON.parse(usernameString)
        const user = await this.userService.findOne(username);
        return user
      }
      catch(error){
        console.log(error)
      }

    }

}
