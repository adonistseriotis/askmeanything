const knex = require("../config/knex");

const answer = async (body) => {
    return knex.raw(
        'Call sp_answer(?,?,?,1)',
        [body.questionID, body.body, body.username]
    )
}

module.exports = answer
