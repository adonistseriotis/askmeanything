import {ViewEntity, ViewColumn} from "typeorm";


@ViewEntity('vuAnswers',{

    expression: `
        SELECT *
        FROM  public."vuAnswers"
        `

})


export class vuAnswers {

    @ViewColumn()
    id: number;

    @ViewColumn()
    body: String;

    @ViewColumn()
    datetime: Text;

    @ViewColumn()
    username: String;

    @ViewColumn()
    questionID: number;



}