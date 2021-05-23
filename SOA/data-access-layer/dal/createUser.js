const User = require('../models/user');

const bcrypt = require('bcrypt');    

const createUser = async (body) => {

    if(!(body.username && body.password && body.email && body.firstName && body.lastName)) {
        return {
            data: {
                error: "Not valid input"
            },
            status: 400
        };
    }

    return await User.forge({
        username: body.username,
        lastName: body.lastName,
        firstName: body.firstName,
        password: body.password,
        email: body.email
    }).save()
    .then((savedModel) => {
        return {
            data: {
                ...savedModel.toJSON(),
                message: "User successfully created!"
            },
            status: 201
        }
    })
    .catch((error) => {
        throw {
            data: {
                error: error.detail
            },
            status: 400
        }
    })
}

module.exports = createUser