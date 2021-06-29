const knex = require("../config/knex");

const myanswers = async (body) => {
    return knex.raw(
        'SELECT * FROM public."vuAnswers" WHERE username=?',
        [body.username]
    )
}

module.exports = myanswers