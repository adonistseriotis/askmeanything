import { Column } from 'typeorm'

export class vuQuestionAnswers {
    @Column()
    questionid: number;

    @Column()
    questiontitle: string;

    @Column()
    questionbody: string;

    @Column()
    questiondatecreated: string;

    @Column()
    questionisedited: boolean;

    @Column()
    questiondateupdated: string;

    @Column()
    username: string;

    @Column()
    answers: JSON;

    @Column()
    keywords: JSON;

}