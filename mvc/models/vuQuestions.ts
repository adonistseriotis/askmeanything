import {ViewEntity, ViewColumn} from "typeorm";


@ViewEntity('vuQuestions',{

    expression: `
        SELECT *
        FROM  public."vuQuestions"
        `

})


export class vuQuestions {

    @ViewColumn()
    row: BigInteger;

    @ViewColumn()
    questionid: number;

    @ViewColumn()
    questiontitle: String;

    @ViewColumn()
    questionbody: String;

    @ViewColumn()
    username: String;
    
    @ViewColumn()
    keywords: JSON;

    @ViewColumn()
    questiondatecreated: String;

    @ViewColumn()
    search: String;
}