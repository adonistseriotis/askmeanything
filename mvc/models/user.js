const { ModelBase } = require('bookshelf');
const bookshelf = require('../config/bookshelf');

const bcrypt = require('bcrypt');

const User = bookshelf.model('User',{
        tableName:'users',
        initialize: function() {
            this.on('saving', this.hashPassword, this);
        },
        hashPassword: (model, attrs, options) => {
            // console.log("Model:", model, "\n\n\n");
            // console.log("Attrs:", attrs, "\n\n\n");
            // console.log("Options:", options, "\n\n\n")
            return new Promise( (resolve, reject) => {
                bcrypt.hash(model.attributes.password, 10, (err, hash) => {
                    if (err)
                        reject(err);
                    model.set('password', hash);
                    resolve(hash);
                });
            });
        }
    },
    {
        login: (username, password) => {
            return new Promise( (resolve, reject) => {
                console.log("Username:", username,"\nPassword:", password)
                if(!username || !password)
                    reject('Email and password are both required')

                const loggedUser = new this({username: username})
                    .fetch()
                    .tap( async (user) => {
                        const authenticate = await bcrypt.compare(password, user.password);
                        
                        if (!authenticate)
                            reject('Invalid password!')
                    });
                resolve(loggedUser);
            });

        }
    }
);

module.exports = User;