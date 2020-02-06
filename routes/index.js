var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET aboutUs page */
router.get('/aboutUs', function(req, res, next) {
    res.render('aboutUs',);
});

module.exports = router;
