const express = require('express');
const router = express.Router();
const questionFeed = require('../dal/questionFeed');

router.get('/', async (req, res) => {

    console.log('Request',req.query)
    await questionFeed(req.query)
    .then(result => res.status(200).send({"questions":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
