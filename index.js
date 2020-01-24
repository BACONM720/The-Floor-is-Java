var express = require('express');
var router = express.Router();
var add = require('./add');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST sum two numbers */
router.post('/add', function (req, res, next){
   var sum = add(req.body.num1, req.body.num2);
   res.json({Sum : sum});
});


/**
* Adds comments to our database
*/
router.post('/addComment', function(req, res, next) {
	// Extract the request body which contains the comments
	comment = new Comment(req.body);

	var commentSanitised = false;
	for (key in comment) {
		if (comment[key] > 47 && comment[key] < 58) {
			commentSanitised = true;
		}
		
		if (comment[key] > 64 && comment[key] < 91) {
			commentSanitised = true;
		}

		if (comment[key] > 96 && comment[key] < 123) {
			commentSanitised = true;
		}
	 
	}
	if (commentSanitised == true) {

		comment.save(function (err, savedComment) {
			if (err)
			throw err;
			res.json({"id": savedComment._id});
		});
	}
});

/**
* Retrieves comments from the database
*/
router.get('/getComments', function(req, res, next)
{
	Comment.find({}, function (err,comments) {
		if (err)
		res.send(err);
		res.json(comments);
	}).sort({'date_created':-1}).limit(10);
}); 

/*
Deletes a comment from the database
*/
router.delete('/removeComment/:id', function(req, res, next){
	var id = req.params.id;
	Comment.remove({_id:id}, function (err, comment) {
		if (err)
		res.send(err);
		res.json(comment);
	});
});

module.exports = router;


