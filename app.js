const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views' );

const handlebars = require('express-handlebars')
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', 'hbs' );


app.get('/', (req, resp) => {
    resp.render('index', {title: "THIS IS HANDLEBARS", list: ['a', 'b']} );
});

app.get('/books', (req, resp) => {
    resp.send('hellow books');
});


app.listen(port, function(err) {
    console.log('running server on port: ' + port);
});
