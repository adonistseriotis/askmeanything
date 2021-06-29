const express = require('express');
const router = express.Router();
const questionsPerKeyword = require('../dal/questionsPerKeyword');

router.get('/', async (req, res) => {

    await questionsPerKeyword(req.body)
    .then(result => res.status(200).send({"chartData":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
