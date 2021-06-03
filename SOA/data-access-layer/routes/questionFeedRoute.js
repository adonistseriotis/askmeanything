const express = require('express');
const router = express.Router();
const questionFeed = require('../dal/questionFeed');

router.get('/', async (req, res) => {

    await questionFeed(req.body)
    .then(result => res.status(200).send({"questions":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
