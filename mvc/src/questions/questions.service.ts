import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { vuQuestionAnswers } from '../../models/vuQuestionAnswers';

@Injectable()
export class QuestionsService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async findOne(id: number): Promise<vuQuestionAnswers> {
        try {
            const question = await this.manager.findOne(vuQuestionAnswers, {questionid: id} );
            console.log('Service', question)
            return question
        }
        catch(error){
            console.log('Error', error)
        }
    }
}
