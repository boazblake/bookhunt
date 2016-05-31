const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;


const router = () => {
	authRouter.route('/signUp')
		.post( (req, res) => {
			console.log('req.body>>>', req.body);
		});

	return authRouter;

};

module.exports = router;