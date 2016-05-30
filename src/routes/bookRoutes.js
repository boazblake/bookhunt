const express = require('express');

const bookRouter = express.Router();

var router = (nav) => {
	var books = [
		{
			title: 'Book A',
			author: 'Author A'
		},
		{
			title: 'Book B',
			author: 'Author B'
		},
		{
			title: 'Book C',
			author: 'Author C'
		},
		{
			title: 'Book E',
			author: 'Author E'
		},
		{
			title: 'Book F',
			author: 'Author F'
		},
		{
			title: 'Book G',
			author: 'Author G'
		},
		{
			title: 'Book H',
			author: 'Author H'
		}];
	bookRouter.route('/')
		.get((req, res) => {
			res.render('bookListView', {
	    	title: 'Books',
	    	nav: nav,
	    		books:books
	    	});
	});

	bookRouter.route('/:id')
		.get((req, res) => {
			var id = req.params.id;
			res.render('bookView', {
	    	title: 'Books',
	    	nav: nav,
	    		book:books[id]
	    	});
	});
		return bookRouter;
};

module.exports = router;