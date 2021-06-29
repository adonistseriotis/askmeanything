const knex = require("../config/knex");

const keywords = async (params) => {
    return knex.raw(
        'SELECT "ID" AS value, name AS label FROM public.keywords'
    )
}

module.exports = keywords
