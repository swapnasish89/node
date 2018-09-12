var user = require("../models/user");
var config = require("../../config");
var jsonwebtoken = require('jsonwebtoken');

var secretKey = config.secretKey;

function createToken(user){

	var token = jsonwebtoken.sign({
		_id : user._id,
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

			res.json({message : 'User has been created!'});
		});

	});

	api.get('/users', function(req, res){

		user.find({}, function(err, users){
			if(err){
				res.send(err);
				return;
			}

			res.json(users);

		});
	});

	api.post('/login', function(req,res){
		user.findOne({
			username : req.body.username
		}).select('password').exec(function(err, user){

			if(err){
				res.send(err);
				return;
			}

			if(!user){
				res.json({
					success : false,
					message : "User does not exist."});
			} else {

				var  validPassword = user.comparePassword(req.body.password);

				if(!validPassword){
					res.json({
						success : false,
						message : "Invalid Password."});
				} else {
					var token = createToken(user);

					res.json({
						success :true,
						token : token,
						message : "Success."});	
				}

			}
		});



	});

	return api;
}