const express = require('express');
const app = express();
const port = 3000;

function MovieData(title, poster, overview) {
    this.title = title;
    this.poster_path = poster;
    this.overview = overview;
}

app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.send(new MovieData(
        "Spider-Man: No Way Home",
        "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
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