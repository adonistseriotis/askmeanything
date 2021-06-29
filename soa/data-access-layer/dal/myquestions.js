const knex = require("../config/knex");

const myquestions = async (body) => {
    return knex.raw(
        'SELECT * FROM public."vuQuestions" WHERE username=?',
        [body.username]
    )
}

module.exports = myquestions