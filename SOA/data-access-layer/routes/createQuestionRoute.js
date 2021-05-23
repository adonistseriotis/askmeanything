const express = require('express');
const router = express.Router();
const createQuestion = require('../dal/createQuestion');

router.post('/', async (req, res) => {
    console.log(req.body)
    await createQuestion(req.body)
    .then(result => res.status(201).send({"questionID":result.rows[0].returnableqid}))
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
