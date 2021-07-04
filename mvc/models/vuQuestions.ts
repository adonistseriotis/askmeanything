import {ViewEntity, ViewColumn} from "typeorm";


@ViewEntity('vuQuestions',{

    expression: `
        SELECT *
        FROM  public."vuQuestions"
        `

})


export class vuAnswers {

    @ViewColumn()
    row: BigInteger;

    @ViewColumn()
    questionID: number;

    @ViewColumn()
    questiontitle: String;

    @ViewColumn()
    questionbody: String;
    

}