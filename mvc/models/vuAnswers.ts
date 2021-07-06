import {ViewEntity, ViewColumn} from "typeorm";


@ViewEntity('vuAnswers',{

    expression: `
        SELECT *
        FROM  public."vuAnswers"
        `

})


export class vuAnswers {

    @ViewColumn()
    ID: number;

    @ViewColumn()
    body: String;

    @ViewColumn()
    datetime: String;

    @ViewColumn()
    username: String;

    @ViewColumn()
    questionID: number;



}