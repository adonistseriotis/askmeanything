const knex = require("../config/knex");

const questionsPerDay = async (body) => {
    return knex.raw(
        'SELECT * FROM public."vuQuestionsPerDay"'
    )
}

module.exports = questionsPerDay