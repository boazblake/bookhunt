const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));



app.get('/', (req, resp) => {
    resp.send('jellow world');
});

app.get('/books', (req, resp) => {
    resp.send('hellow books');
});


app.listen(port, function(err) {
    console.log('running server on port: ' + port);
});
