const express = require('express');
const router = express.Router();
const questionsPerDay = require('../dal/questionsPerDay');

router.get('/', async (req, res) => {

    await questionsPerDay(req.body)
    .then(result => {console.log(result.rows);res.status(200).send({"chartData":result.rows})})
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
