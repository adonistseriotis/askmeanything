const express = require('express');
const router = express.Router();
const search = require('../dal/search');

router.post('/', async (req, res) => {

    await search(req.body)
    .then(result => res.status(200).send({"questions":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})
module.exports = router;
