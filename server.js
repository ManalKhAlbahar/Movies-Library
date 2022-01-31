const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios').default;
const data = require('./Movie Data/data.json')

function MovieData(id, title, release_date, poster, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster;
    this.overview = overview;
}

app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.send(data);
});

app.get('/favorite', (req, res) => {
    res.send("Welcome to Favorite Page");
});

app.get('/trending', (req, res) => {
    axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=c5ba4c0a872712a0e57673a2187d8a0c&language=en-US')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            let m = response.data.results[0];
            res.send(new MovieData(m.id, m.title, m.release_date, m.poster_path, m.overview));
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.sendStatus(500).send("error while getting trending movie, error: " + error)
        });
});

app.get('/search', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c5ba4c0a872712a0e57673a2187d8a0c&language=en-US&query=${req.query.q}&page=2`)
        .then(function (response) {
            // handle success
            //console.log(response.data);
            let m = response.data.results[0];
            res.send(new MovieData(m.id, m.title, m.release_date, m.poster_path, m.overview));
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.sendStatus(500).send("error while getting trending movie, error: " + error)
        });
});

app.get('/search_by_id', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}?api_key=c5ba4c0a872712a0e57673a2187d8a0c`)
        .then(function (response) {
            // handle success
            console.log(response.data);
            let m = response.data;
            res.send(new MovieData(m.id, m.title, m.release_date, m.poster_path, m.overview));
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.sendStatus(500).send("error while getting trending movie, error: " + error)
        });
});

app.get('/revnue', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}?api_key=c5ba4c0a872712a0e57673a2187d8a0c`)
        .then(function (response) {
            // handle success
            console.log(response.data);
            let m = response.data;
            res.send(`Revenue: ${m.revenue}$`);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.sendStatus(500).send("error while getting trending movie, error: " + error)
        });
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