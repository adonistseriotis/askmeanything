const express = require('express');
const router = express.Router();
const updateQuestion = require('../dal/updateQuestion');

router.post('/', async (req, res) => {
    console.log(req.body)
    await updateQuestion(req.body)
    .then(result => res.status(201).send({"message":"Question updated"}))
    .catch(error => res.status(400).send({"error":error.detail}))

})

module.exports = router;
