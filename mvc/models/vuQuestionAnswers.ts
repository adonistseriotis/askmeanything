import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity('vuQuestionAnswers',{
    expression: `
        SELECT * FROM public."vuQuestionAnswers"
    `
})

export class vuQuestionAnswers {
    @ViewColumn()
    questionid: number;

    @ViewColumn()
    questiontitle: string;

    @ViewColumn()
    questionbody: string;

    @ViewColumn()
    questiondatecreated: string;

    @ViewColumn()
    questionisedited: boolean;

    @ViewColumn()
    questiondateupdated: string;

    @ViewColumn()
    username: string;

    @ViewColumn()
    answers: JSON;

    @ViewColumn()
    keywords: JSON;

}