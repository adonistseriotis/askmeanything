import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Keywords } from '../../entities/Keywords';
import { EntityManager, Like } from 'typeorm';
import { vuQuestionAnswers } from '../../models/vuQuestionAnswers';
import { vuQuestions } from '../../models/vuQuestions';

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

    async answer(qid: number, body: string, username: string): Promise<number> {
        try{
            let returnableqid;
            const returnable = await this.manager.query("CALL public.sp_answer($1, $2, $3, $4)",[qid, body, username, returnableqid])
            console.log('Returnable',returnable);
            return returnable[0].returnableqid
        }
        catch(error){
            console.error(error)
        }
    }

    async questionFeed(): Promise<Array<vuQuestions>> {
        try{
            const questionFeed = await this.manager.find(vuQuestions);
            return questionFeed
        }
        catch(error) {
            console.log(error)
        }
    }

    async search(filter: string): Promise<Array<vuQuestions>> {
        try{
            console.log(filter)
            const questionFeed = await this.manager.getRepository(vuQuestions).find({where: [{ search: Like(`%${filter}%`)}, { questiontitle: Like(`%${filter}%`)}, { questionbody: Like(`%${filter}%`)}]})
            return questionFeed
        }
        catch(error){
            console.log(error)
        }
    }

    async createQuestion(title: string, body: string, username: string, keywords: JSON){
        try{
            let returnableqid;
            const returnable = await this.manager.query("CALL public.sp_createquestion($1, $2, $3, $4, $5)",[title, body, username, keywords, returnableqid])
            return returnable[0].returnableqid
        }
        catch(error){
            console.error(error)
        }
    }

    async getKeywords(){
        try {
            const rawKeywords = await this.manager.find(Keywords);
            const keywords = rawKeywords.map(row => ({label: row.name, value: row.id}))
            return keywords
        }
        catch(error){
            console.log(error)
        }
    }

    async updateQuestion(qid, title, body, username, keywords){
        try{
            await this.manager.query("CALL public.sp_updatequestion($1, $2, $3, $4, $5)",[qid, title, body, username, keywords])
        }
        catch(error){
            console.log(error)
        }
    }

}
