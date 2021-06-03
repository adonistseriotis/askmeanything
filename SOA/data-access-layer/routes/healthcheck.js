const express = require('express');
const router = express.Router();
const knex = require("../config/knex");

router.get('/', async (req, res) => {
    await knex.raw('SELECT 1').then(() => {
        /* Call express loader */
        res.status(200).json({message: "All good"})
        
    }).catch(err => {
        /* Failed to connect to db */
        console.log(err);
        res.status(400).json({message: "Error communicating to db"})
    })
    

})

module.exports = router;
