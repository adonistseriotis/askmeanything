const knex = require("../config/knex");

const createQuestion = async (body) => {
    return knex.raw(
        'Call sp_createquestion(?,?,?,?,1)',
        [body.title, body.body, body.username, JSON.stringify(body.keywords)]
    )
}

module.exports = createQuestion
