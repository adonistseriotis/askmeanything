const knex = require("../config/knex");

const search = async (body) => {
    return knex.raw(
        'SELECT * FROM f_search(?)',
        [body.filter]
    )
}

module.exports = search
