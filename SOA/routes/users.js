const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', async (req, res) => {
  await new User().fetchAll().then((users) => {
    res.json({...users, login:User.login("babis","nikos")});
  }).catch((error) => {
    console.log(error);
  });
});

module.exports = router;

