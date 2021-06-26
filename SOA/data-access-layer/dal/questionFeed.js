const knex = require("../config/knex");

const questionFeed = async (body) => {
    console.log('Body filter dal', body.filter)
    if(body.filter) {
        return knex.raw(
            'SELECT * FROM public."vuQuestions" WHERE row <= ?',[body.filter]
        )
    }
    else{
        return knex.raw(
            'SELECT * FROM public."vuQuestions"'
        )
    }
}

module.exports = questionFeed