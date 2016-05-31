const express = require('express');

const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;
const nav = 
	[
		{ Link: '/Books', Text: 'Book' },
		{ Link: '/Authors', Text: 'Author' }
	];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views', './src/views' );

app.set('view engine', 'ejs' );

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);


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
