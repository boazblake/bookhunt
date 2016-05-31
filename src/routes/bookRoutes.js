const express = require('express');

const bookRouter = express.Router();

const sql = require('mssql');

var router = (nav) => {
    var books = [{
        title: 'Book A',
        author: 'Author A'
    }, {
        title: 'Book B',
        author: 'Author B'
    }, {
        title: 'Book C',
        author: 'Author C'
    }, {
        title: 'Book E',
        author: 'Author E'
    }, {
        title: 'Book F',
        author: 'Author F'
    }, {
        title: 'Book G',
        author: 'Author G'
    }, {
        title: 'Book H',
        author: 'Author H'
    }];
    bookRouter.route('/')
        .get((req, res) => {
            var request = new sql.Request();

            request.query('select * from books', (err, recordset) => {
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: recordset
                });
            });
        });

    bookRouter.route('/:id')
    .all( (req, res, next) => {
    	var id = req.params.id;
    	var ps = new sql.PreparedStatement();
    	ps.input('id', sql.Int);
    	ps.prepare('select * from books where id = @id', 
    		(err) => {
    	    ps.execute({ 
    	    	id: req.params.id 
    	    	}, 
    	    	(err, recordset) => {
    	    		if (recordset.length === 0) {
    	    			res.status(404).send('not found');
    	    		} else {
    	    			req.book = recordset[0];
    	    			next();
    	    		}
	    	        req.book = recordset[0];
	    	        next();
    	    });
    	});
    })
    .get((req, res) => {
    	res.render('bookView', {
    	    title: 'Books',
    	    nav: nav,
    	    book: req.book
    	});
    });
    return bookRouter;
};

module.exports = router;
