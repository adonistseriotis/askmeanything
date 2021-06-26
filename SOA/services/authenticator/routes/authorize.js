const express = require('express');
const router = express.Router();
const passport = require('../services/loginService');

router.post('/', passport.authorize('token', {session:false}),
    (req, res) => {
        res.send(req.account);
}
);

module.exports = router;
