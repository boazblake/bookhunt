const express = require('express');

const app = express();

const sql = require('mssql');

const config = {
	user: 'books',
	password: 'bookhunter',
	server: 'localhost\\5000'
};


sql.connect(config, (err) => {
	console.log('err', err);
});

const port = process.env.PORT || 5000;
const nav = 
	[
		{ Link: '/Books', Text: 'Book' },
		{ Link: '/Authors', Text: 'Author' }
	];
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views' );

app.set('view engine', 'ejs' );

app.use('/Books', bookRouter);


app.get('/', (req, resp) => {
    resp.render('index', {
    	title: 'Hellow From Render ',
    	nav: [
    		{ Link: '/Books', Text: 'Books' },
    		{ Link: '/Authors', Text: 'Authors' }
    		]
    	});
});

app.get('/books', (req, resp) => {
    resp.send('hellow books');
});


app.listen(port, function(err) {
    console.log('running server on port: ' + port);
});
