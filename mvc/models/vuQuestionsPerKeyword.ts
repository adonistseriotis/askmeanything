import {ViewEntity, ViewColumn} from "typeorm";


@ViewEntity('vuQuestionsPerKeyword',{

    expression: `
        SELECT *
        FROM  public."vuQuestionsPerKeyword"
        `

})


export class vuQuestionsPerKeyword {

    @ViewColumn()
    name: String;

    @ViewColumn()
    count: BigInteger;
    

}