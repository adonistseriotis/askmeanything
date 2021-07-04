import {ViewEntity, ViewColumn} from "typeorm";
import { View } from "typeorm/schema-builder/view/View";


@ViewEntity('vuQuestionsPerDayPerUser',{

    expression: `
        SELECT *
        FROM  public."vuQuestionsPerDayPerUser"
        `

})


export class vuQuestionsPerDayPerUser {

    @ViewColumn()
    count: BigInteger;

    @ViewColumn()
    day: String;

    @ViewColumn()
    username: String;
    

}