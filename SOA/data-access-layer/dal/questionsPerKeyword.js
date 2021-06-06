const knex = require("../config/knex");

const questionsPerKeyword = async (body) => {
    return knex.raw(
        'SELECT * FROM public."vuQuestionsPerKeyword"'
    )
}

module.exports = questionsPerKeyword