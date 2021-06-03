const knex = require("../config/knex");

const getQuestion = async (params) => {
    return knex.raw(
        'SELECT * FROM public.f_getquestion(?)',
        [params.questionID]
    )
}

module.exports = getQuestion
