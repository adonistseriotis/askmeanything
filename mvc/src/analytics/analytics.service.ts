import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { vuQuestionsPerKeyword } from '../../models/vuQuestionsPerKeyword';
import { EntityManager } from 'typeorm';
import { vuQuestionsPerDayPerUser} from '../../models/vuQuestionPerDayPerUser';
import { vuQuestionsPerDay } from '../../models/vuQuestionsPerDay';


@Injectable()
export class AnalyticsService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async questionsPerDayPerUser(username: String): Promise<Array<vuQuestionsPerDayPerUser>> {
        try {
            const questionspdpu = await this.manager.find(vuQuestionsPerDayPerUser, {where: {username: username}});
            console.log('AnalyticsService',questionspdpu)
            return questionspdpu
        }
        catch(error){
            console.log('error')
        }

    }

    async questionsPerDay(): Promise<Array<vuQuestionsPerDay>> {
        try {
            const questionspd = await this.manager.find(vuQuestionsPerDay);
            console.log('AnalyticsService2',questionspd)
            return questionspd
        }
        catch(error){
            console.log('error')
        }
    }


    async questionsPerKeyword(): Promise<Array<vuQuestionsPerKeyword>> {
        try {
            const questionspk = await this.manager.find(vuQuestionsPerKeyword)
            console.log('AnalyticsService3',questionspk)
            return questionspk
        }
        catch(error) {
            console.log(error)
        }
    }
}

    
