const express = require('express');
const app = express();
const port = 3000;
const data = require('./Movie Data/data.json')

function MovieData(title, poster, overview) {
    this.title = title;
    this.poster_path = poster;
    this.overview = overview;
}

app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.send(new MovieData(
        data.title,
        data.poster_path,
        data.overview
    ));
});

app.get('/favorite', (req, res) => {
    res.send("Welcome to Favorite Page");
});

app.get('*', (req, res) => {
    res.status(404).send("page not found error 404");
});

// https://expressjs.com/en/guide/error-handling.html
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        "status": 500,
        "responseText": "Sorry, something went wrong"
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});