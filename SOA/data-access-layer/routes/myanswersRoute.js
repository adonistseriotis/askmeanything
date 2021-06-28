const express = require('express');
const router = express.Router();
const myanswers = require('../dal/myanswers');

router.post('/', async (req, res) => {

    await myanswers(req.body)
    .then(result => res.status(201).send({"answers":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})
module.exports = router;
