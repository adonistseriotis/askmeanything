const express = require('express');
const router = express.Router();
const myquestions = require('../dal/myquestions');

router.post('/', async (req, res) => {

    await myquestions(req.body)
    .then(result => res.status(201).send({"questions":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})
module.exports = router;
