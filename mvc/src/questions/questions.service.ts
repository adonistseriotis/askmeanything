import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { vuQuestionAnswers } from '../../models/vuQuestionAnswers';

@Injectable()
export class UsersService {
    constructor(@InjectEntityManager() private em: EntityManager) {}

    async findOne(id: number): Promise<vuQuestionAnswers> {
        try {
            const question = await this.em.query("f_getquestion(?)",[id]);

            return question
        }
        catch(error){
            console.log('Error', error)
        }
    }
}
