const { ModelBase } = require('bookshelf');
const bookshelf = require('../config/bookshelf');
const BluePromise = require('bluebird');
const bcrypt = BluePromise.promisifyAll(require('bcrypt'));

const User = bookshelf.model('User', {
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
    }
);

module.exports = User;