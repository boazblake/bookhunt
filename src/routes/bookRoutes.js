const express = require('express');
const bookRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


var router = (nav) => {
	var bookService = require('../services/goodReadsService')();
	var bookController = require('../controllers/bookController')(bookService, nav);

	bookRouter.use(bookController.middleWare);

	bookRouter.route('/')
		.get(bookController.getIndex);

	bookRouter.route('/:id')
		.get(bookController.getById);
		return bookRouter;
};

module.exports = router;