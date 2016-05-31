const express = require('express');

const bookRouter = express.Router();

const mongodb = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectID;


var router = (nav) => {

	bookRouter.route('/')
		.get( (req, res) => {
			var id = req.params.id;
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, (err, db) => {
				var collection = db.collection('books');

				collection.find({}).toArray(
					(err, books) => {
						res.render('bookListView', {
					    	title: 'Books',
					    	nav: nav,
					    	books:books
			    		});
					}
				);

			});
				

	});

	bookRouter.route('/:id')
		.get((req, res) => {
			var id = new ObjectId(req.params.id);
			console.log('id>>>>', id)
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, (err, db) => {
				var collection = db.collection('books');

				collection.findOne({_id: id},
					(err, book) => {
						res.render('bookView', {
					    	title: 'Books',
					    	nav: nav,
				    		book: book
				    	});
					});
			});

		});
		return bookRouter;
};

module.exports = router;