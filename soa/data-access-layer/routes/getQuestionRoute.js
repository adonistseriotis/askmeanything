const express = require('express');
const router = express.Router();
const getQuestion = require('../dal/getQuestion');

router.get('/', async (req, res) => {
    await getQuestion(req.query)
    .then(result => res.status(200).send({"question":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
