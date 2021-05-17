const express = require('express');
const router = express.Router();
const User = require('../models/user');
const logger = require('../services/logger');
const getUser = require('../dal/getUser');

/* GET users listing. */
router.post('/', async (req, res) => {
  // await new User().fetchAll().then((users) => {
  //   res.json(users);
  // }).catch((error) => {
  //   logger.error(error);
  //   console.log(error);
  // });

  const user = await getUser(req.body)
  .then(result => res.status(result.status).send({...result.data}))
  .catch(error => res.status(error.status).send({...error.data}))
  
});

module.exports = router;

