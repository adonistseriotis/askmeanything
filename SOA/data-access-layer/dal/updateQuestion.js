const knex = require("../config/knex");

const updateQuestion = async (body) => {
    return knex.raw(
        'Call sp_updatequestion(?,?,?,?,?)',
        [body.questionID, body.title, body.body , body.username, JSON.stringify(body.keywords)]
    )
}

module.exports = updateQuestion
