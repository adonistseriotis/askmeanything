const { knex } = require('../config/bookshelf');

const getUser = async (body) => {

    if(!body.username)
        throw {
            data: {
                error: "Invalid request"
            },
            status: 400,
            
        };
    return await knex.raw('SELECT * FROM users where username = :username',body)
    .then((result) => {
        if(result.rows.length === 0)
          throw "No such user!"
        return {
            data: {
            ...result.rows[0] 
            },
            status: 200
        }
    })
    .catch(err => {
        return {
            data : {
                error: err
            },
            status: 400,
        }
    })
}

module.exports = getUser