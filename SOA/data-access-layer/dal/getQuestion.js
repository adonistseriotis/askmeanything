const knex = require("../config/knex");

const getQuestion = async (body) => {
    return knex.raw(
        'SELECT * FROM public.f_getquestions(?)',
        [body.questionID]
    )
}

module.exports = getQuestion
