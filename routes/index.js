var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
res.render('aboutUs', {welcome: 'Welcome to my about us page'});
});

router.get('/multiply', function (req, res, next){
console.log(multiply);
var result = multiply(paseInt(req.query.num1), parseInt(req.query.num2));
res.status(200).send('The multiplication of the numbers is '+ result);
});

router.post('/vehicles', function (req, res, next){
var marysVehicles = [{make:'ford', model: 'mondeo', age: 3}];
var johnsVehicles = [{make:'ferrari', model: 'T20', age: 6}];
if(req.body.name == 'mary'){
res.json({Vehicles : marysVehicles});
}
else if(req.body.name == 'john'){
res.json({Vehicles : johnsVehicles});
}
else{
res.json("no person by this name");
}

res.json({"Vehicles" : 'My vehicle'});

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

/*router.put('/upComment/:id', function(req, res, next){
var test = req.body.comment.replace(/\s+/g, '');
var validator = require('validator');
var id = req.params.id;

// Using support $inc to increment the up_votes each time the update is called
if(validator.isAlphanumeric(test)){
    Comment.update({_id:id}, { $inc: { up_votes: 1 }}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
}
});*/

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


module.exports = router;
