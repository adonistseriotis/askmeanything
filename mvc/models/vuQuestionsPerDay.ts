import {ViewEntity, ViewColumn} from "typeorm";


@ViewEntity('vuQuestionsPerDay',{

    expression: `
        SELECT *
        FROM  public."vuQuestionsPerDay"
        `

})


export class vuQuestionsPerDay {

    @ViewColumn()
    count: BigInteger

    @ViewColumn()
    day: String;
    

}