const express = require('express');
const router = express.Router();
const myQuestionsPerDay = require('../dal/myquestionsPerDay');

router.post('/', async (req, res) => {
    console.log(req.body)
    await myQuestionsPerDay(req.body)
    .then(result => res.status(201).send({"chartData":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
