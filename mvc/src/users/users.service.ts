import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Users } from '../../entities/Users';
import * as bcrypt from 'bcrypt'
import { vuQuestionsPerDayPerUser } from 'models/vuQuestionPerDayPerUser';
import { vuQuestions } from 'models/vuQuestions';
import { vuAnswers } from 'models/vuAnswers';

@Injectable()
export class UsersService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async findOne(username: string): Promise<Users> {
        try {
            const user = await this.manager.findOne(Users, {username: username});
            if(!user )
                throw new NotFoundException(`User ${username} not found`);
            else
                return user;
        }
        catch(error){
            console.log('Error', error)
        }
    }

    async create(userObject: Users): Promise<Users> {
        try{
            const hash = await bcrypt.hash(userObject.password, 10)
            userObject.password = hash
            const user = await this.manager.create(Users, userObject);
            // console.log(user)
            return this.manager.save(user);
        }
        catch(error){
            console.log(error)
        }
    }

    async authorize(username, password): Promise<boolean> {
        try{
            const user = await this.findOne(username)
            const isMatch = await bcrypt.compare(password, user.password);
            return isMatch
        }
        catch(error){
            console.log('Authorize dal', error)
            return false
        }
    }

    async myQuestionsPerDay(username): Promise<Array<vuQuestionsPerDayPerUser>> {
        try{
            const myQuestionsPerDay = await this.manager.getRepository(vuQuestionsPerDayPerUser).find({where: [{ username: username}]})
            return myQuestionsPerDay
        }
        catch(error){
            console.log(error)
        }
    }

    async myQuestions(username): Promise<Array<vuQuestions>> {
        try{
            const questions = await this.manager.getRepository(vuQuestions).find({where: [{ username: username}]})
            return questions
        }
        catch(error){
            console.log(error)
        }
    }

    async myAnswers(username): Promise<Array<vuAnswers>> {
        try{
            const answers = await this.manager.getRepository(vuAnswers).find({where: [{ username: username}]})
            return answers
        }
        catch(error){
            console.log(error)
        }
    }
}
