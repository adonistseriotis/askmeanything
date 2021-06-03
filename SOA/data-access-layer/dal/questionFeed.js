const knex = require("../config/knex");

const questionFeed = async (body) => {
    return knex.raw(
        'SELECT * FROM public."vuQuestions"'
    )
}

module.exports = questionFeed