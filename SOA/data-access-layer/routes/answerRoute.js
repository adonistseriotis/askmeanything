const express = require('express');
const router = express.Router();
const answer = require('../dal/answer');

router.post('/', async (req, res) => {

    await answer(req.body)
    .then(result => res.status(201).send({"questionID":result.rows[0].returnableqid}))
    .catch(error => res.status(400).send({"error":error.detail}))

})
module.exports = router;
