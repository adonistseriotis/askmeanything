const express = require('express');
const router = express.Router();
const keywords = require('../dal/keywords');

router.get('/', async (req, res) => {
    await keywords()
    .then(result => res.status(201).send({"keywords":result.rows}))
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
