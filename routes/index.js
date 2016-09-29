var express = require('express');
var router = express.Router();
var authCheck = require('../service/authCheck');

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {
		userId: req.session.userid,
	};
	console.log(data)
	res.render('home/index', data);
});

module.exports = router;
