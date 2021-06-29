const knex = require("../config/knex");

const questionsPerDay = async (body) => {
    return knex.raw(
        'SELECT * FROM public."vuQuestionsPerDayPerUser" WHERE username = ?',
        [body.username]
    )
}

module.exports = questionsPerDay