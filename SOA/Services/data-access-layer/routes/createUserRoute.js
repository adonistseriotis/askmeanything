const express = require('express');
const router = express.Router();
const createUser = require('../dal/createUser');

router.post('/', async (req, res) => {

    await createUser(req.body)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status).send({...error.data}))

})

module.exports = router;
