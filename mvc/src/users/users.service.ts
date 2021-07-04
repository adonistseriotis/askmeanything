import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Users } from '../../entities/Users';

@Injectable()
export class UsersService {
    constructor(@InjectEntityManager() private em: EntityManager) {}

    async findOne(username: string): Promise<Users> {
        try {
            const user = await this.em.findOne(Users, {username: username});
            if(!user )
                throw new NotFoundException(`User ${username} not found`);
            else
                return user;
        }
        catch(error){
            console.log('Error', error)
        }
    }
}
