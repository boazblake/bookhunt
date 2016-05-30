const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views' );
app.set('view engine', 'jade' );



app.get('/', (req, resp) => {
    resp.render('index', {list: ['a', 'b']});
});

app.get('/books', (req, resp) => {
    resp.send('hellow books');
});


app.listen(port, function(err) {
    console.log('running server on port: ' + port);
});
