const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const bookController = (bookService, nav) => {

    var middleWare =  ( req, res, next) => {
        if (!req.user) {
        res.redirect('/');
        }
        next(); 
    };

    var getIndex =  (req, res) => {
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
    };
    
    var getById = (req, res) => {
        var id = new ObjectId(req.params.id);
        console.log('id>>>>', id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, (err, db) => {
            var collection = db.collection('books');

            collection.findOne({_id: id},
                (err, results) => {
                    if (results.bookId){
                        bookService.getBookById(results.bookId,
                        (err, book) => {
                            results.book = book;
                            res.render('bookView', {
                                title: 'Books',
                                nav: nav,
                                book: results
                            });                            
                        });                        
                    }
                    else {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            books:books
                        });
                    }
                    });
                });
            };
    
    return {
        getIndex: getIndex,
        getById: getById,
        middleWare: middleWare
    };
};


module.exports = bookController;