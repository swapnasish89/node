var user = require("../models/user");
var story = require("../models/story");
var config = require("../../config");
var constant = require("../common/constant");
var jsonwebtoken = require('jsonwebtoken');

var secretKey = config.secretKey;

function createToken(user){

	var token = jsonwebtoken.sign({
		id : user._id,
		name : user.name,
		username : user.username
	}, secretKey, { expiresIn : 60*60*24});

	return token;
}


module.exports = function(app, express){

	var api = express.Router();

	api.post('/signup', function(req, res){

		var userModel = new user({
			name : req.body.name,
			username :  req.body.username,
			password :  req.body.password
		});

		userModel.save(function(err){
			if(err){
				console.log("Error ::  "+err );
				res.send(err);
				return;
			}

			res.status(constant.successCode).json({message : 'User has been created!'});
		});

	});

	api.get('/users', function(req, res){

		user.find({}, function(err, users){
			if(err){
				res.send(err);
				return;
			}

			res.status(constant.successCode).json(users);

		});
	});

	api.post('/login', function(req,res){

		user.findOne({
			username : req.body.username
		}).select('name username password').exec(function(err, user){

			//console.log(1);

			if(err){
				res.send(err);
				return;
			}

			if(!user){
				//console.log(2);
				res.status(constant.errorCode).json({
					success : false,
					message : "User does not exist."});
			} else {

				var  validPassword = user.comparePassword(req.body.password);

				if(!validPassword){
					res.status(constant.errorCode).json({
						success : false,
						message : "Invalid Password."});
				} else {
					var token = createToken(user);

					//console.log(token);

					res.status(constant.successCode).json({
						success :true,
						token : token,
						message : "Success."});	
				}
			}
		});
	});

	api.use(function(req, res, next){
		var token = req.body.token || req.param('token') || req.headers['x-access-token'] ;

		if(token){			
			jsonwebtoken.verify(token, secretKey, function(err, decoded){
				if(err){
					res.status(constant.errorCode).send({success : false, message : 'Failed to authenticate user!'});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(constant.errorCode).send({success : false, message : 'No valid token!'});
		}

	})

	api.route('/').post(function(req,res){

		var story = new story({
			creator : req.decoded.id,
			content : rqe.body.content,
		});

		story.save(function(err){
			if(err){
				res.status(constant.errorCode).send(err);
				return;
			}

			res.status(constant.successCode).json({success:true, message : 'New story created.'})
		});

	})

	.get(function(req, res){
		story.find({creator : req.decoded.id }, function(err, stories){
			if(err){
				res.status(constant.errorCode).send(err);
				return;
			}

			res.status(constant.successCode).json(stories);
		});
	})

	api.get('/currentUser', function(req, res){
		res.status(constant.successCode).json(req.decoded);
	});

	return api;
}