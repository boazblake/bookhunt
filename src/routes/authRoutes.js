const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const passport = require('passport');


const router = () => {
	authRouter.route('/signUp')
		.post( (req, res) => {
			console.log('req.body>>>', req.body);
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, (err, db) => {
				var collection = db.collection('users');
				var user = {
					username: req.body.userName,
					password: req.body.password
				};

				collection.insert(user, (err, result) => {
					req.login(result.ops[0], () => {
						res.redirect('/auth/profile');
					});
				});
			});
		});


	authRouter.route('/logIn')
		.post(passport.authenticate('local', {
			failureRedirect: '/'
		}), (req, res) => {
			res.redirect('/auth/profile');
		});

	authRouter.route('/profile')
		.all((req, res, next) => {
			if (!req.user) {
				res.redirect('/');
			} 
			next(); 
		})
		.get( (req, res) => {
			res.json(req.user);
		});

	return authRouter;

};

module.exports = router;