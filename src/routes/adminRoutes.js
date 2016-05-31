const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

var books = [
        {
            'link': 'http://www.packtpub.com/learning-jquery-with-simple-javascript-techniques-fourth-edition/book',
            'imgSrc': 'http://jquery.com/jquery-wp-content/themes/jquery/content/books/learning-jquery-4th-ed.jpg',
            'bookId': '656',
            'title': 'war and peace',
            'authors': 'Karl Swedberg and Jonathan Chaffer'
        },
        {
            'link': 'http://www.manning.com/affiliate/idevaffiliate.php?id=648_176',
            'imgSrc': 'http://jquery.com/jquery-wp-content/themes/jquery/content/books/jquery-in-action.jpg',
            'title': 'les mis',
            'bookId': '24280',
            'authors': 'Bear Bibeault and Yehuda Katz'
        },
        {
            'link': 'http://www.syncfusion.com/resources/techportal/ebooks/jquery?utm_medium=BizDev-jQuery.org0513',
            'imgSrc': 'http://jquery.com/jquery-wp-content/themes/jquery/content/books/jquery-succinctly.jpg',
            'title': 'jQuery Succinctly',
            'authors': 'Cody Lindley'
        },
        {
            'link': 'http://www.packtpub.com/jquery-hotshot/book',
            'imgSrc': 'http://www.packtpub.com/sites/default/files/9106OS_%20jQuery%20Hotshots.jpg',
            'title': 'jQuery Hotshot',
            'authors': 'Dan Wellman'
        },
        {
            'link': 'http://www.packtpub.com/jquery-boilerplate-for-plugins/book',
            'imgSrc': 'http://www.packtpub.com/sites/default/files/9700OS.jpg',
            'title': 'Instant jQuery Boilerplate for Plugins',
            'authors': 'Jonathan Fielding'
        },
        {
            'link': 'http://www.packtpub.com/jquery-2-0-animation-techniques-beginners-guide/book',
            'imgSrc': 'http://dgdsbygo8mp3h.cloudfront.net/sites/default/files/imagecache/productview_larger/9642OScov.jpg',
            'title': 'jQuery 2.0 Animation Techniques: Beginner`s Guide',
            'authors': 'Adam Culpepper & Dan Wellman'
        },
        {
            'link': 'http://www.packtpub.com/jquery-game-development-essentials/book',
            'imgSrc': 'http://dgdsbygo8mp3h.cloudfront.net/sites/default/files/imagecache/productview_larger/5060OTcov.jpg',
            'title': 'jQuery Game Development Essentials',
            'authors': 'Selim Arsever'
        },
        {
            'link': 'http://www.packtpub.com/django-javascript-integration-ajax-and-jquery/book',
            'imgSrc': 'http://dgdsbygo8mp3h.cloudfront.net/sites/default/files/imagecache/productview_larger/0349OS_MockupCover_0.jpg',
            'title': 'Django JavaScript Integration: AJAX and jQuery',
            'authors': 'Jonathan Hayward'
        }
    ];


const router = (nav) => {

	adminRouter.route('/addBooks')
		.get((req, res) => {
			var url = 'mongodb://localhost:27017/libraryApp';
		mongodb.connect(url, (err, db) => {
			var collection = db.collection('books');
			collection.insertMany(books, 
				(err, results) => {
					res.send(results);
					db.close();
				}
			);
		});
			// res.send('inserting books');
		});

	return adminRouter;
};

module.exports = router;