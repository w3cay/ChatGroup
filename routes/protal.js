var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');


/*
 * POST
 */
router.post('/login', function (req, res) {
    userController.login(req, res);
});

/*
 * GET
 */
router.get('/logout', function (req, res) {
    userController.logout(req, res);
});

module.exports = router;