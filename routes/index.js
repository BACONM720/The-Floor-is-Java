var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var Recipe = require('/students/danu7_hs1/myGroupProjectApp/models/recipes.js'); //CHANGE LOCATION
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

 router.get('/about', function(req, res, next) {
res.render('aboutUs', {welcome: 'Welcome to my about us page'});
});



router.post('/email', function (req, res, next){
var validator = require('validator');
if(validator.isEmail(req.body.email) == true){
	res.json("well done thats an actual email");
}
else{
	res.json("E-mail is not valid you fool");
}
});

router.post('/addComment', function(req, res, next) {
 var validator = require('validator');
 var test = req.body.comment.replace(/\s+/g, '');
 var test2 = req.body.user_name.replace(/\s+/g, '');
            // Extract the request body which contains the comments
			if(validator.isAlphanumeric(test) && validator.isAlphanumeric(test2)){
            comment = new Comment(req.body);
            comment.save(function (err, savedComment) {

                if (err)
                    throw err;

                res.json({
                    "id": savedComment._id
                });
            });
			}
			else{
				res.json("Not a valid Comment");
			}
});

 router.get('/getComments', function(req, res, next)
{
    Comment.find({}, function (err, comment) {
        if (err)
            res.send(err);

        res.json(comment);
    }).sort('-date_created').limit(10);
});

 router.get('/getComment/:id', function(req, res, next){
 var validator = require('validator');
var id = req.params.id;
 var test = req.body.comment.replace(/\s+/g, '');
 var test2 = req.body.user_name.replace(/\s+/g, '');
 if(validator.isAlphanumeric(test) && validator.isAlphanumeric(test2)){
Comment.find({_id:id}, function(err, comment){
if(err)
throw err;
res.json(comment);
})
}
else{
res.json("not valid ID");
}
});

 

router.put('/upComment/:id', function(req, res, next){
var test = req.body.comment.replace(/\s+/g, '');
var validator = require('validator');
var id = req.params.id;
if(validator.isAlphanumeric(test)){
Comment.update({_id:id},{$set:{comment:req.body.comment}}, function(err, comment){
if(err)
throw err;
res.json(comment);
})
}
else{
	res.json("not a valid ID");
}
});

router.put('/upVotes/:id', function(req, res, next){

    var id = req.params.id;

	// Using support $inc to increment the up_votes each time the update is called
    Comment.update({_id:id}, { $inc: { up_votes: 1 }}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});


router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.deleteOne({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the document"});
    });
});

router.get('/feed', function(req, res, next) {
res.render('feed');
});

/**
* Retrieves meals from the database
*/

router.get('/getMealsData', function(req,res, next) {
	var resultsArray = [];
	Recipe.find({ $or: [{vegan:req.query.vegan}, {glutfree:req.query.glutfree},{dFree:req.query.dFree},{hCalorie:req.query.hCalorie},{lCalorie:req.query.lCalorie}, {veg:req.query.veg}]}, function (err,recipes) {
		for (i = 0; i < recipes.length; i++) {
			resultsArray.push(recipes[i]);
		}
		if (err)
		res.send(err);
		res.render('meals', {items : resultsArray});
});
});


/* Add meals to database */
router.post('/addMeals',function(req, res, next) {
recipes = new Recipe(req.body);
recipes.save(function (err, savedRecipe) {
if (err)
throw err;
res.json({
"id": savedRecipe._id
});
});
});



 
module.exports = router;
