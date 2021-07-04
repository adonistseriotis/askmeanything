import {ViewEntity, ViewColumn} from "typeorm";


@ViewEntity('vuQuestionsPerKeyword',{

    expression: `
        SELECT *
        FROM  public."vuQuestionsPerKeyword"
        `

})


export class vuAnswers {

    @ViewColumn()
    name: String;

    @ViewColumn()
    count: BigInteger;
    

}