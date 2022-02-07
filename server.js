'use strict';
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const axios = require('axios').default;
const data = require('./Movie Data/data.json');
const pg = require('pg');
const bodyParser = require('body-parser');

dotenv.config();

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect();

function MovieData(id, title, release_date, poster, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
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

app.get('/trending', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`)
        .then(function (response) {
            // handle success
            let results = [];
            response.data.results.forEach(m => {
                results.push(new MovieData(m.id, m.title, m.release_date, m.poster_path, m.overview));
            });
            res.send(results);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.sendStatus(500).send("error while getting trending movie, error: " + error)
        });
});

app.get('/search', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}=en-US&query=${req.query.q}&page=2`)
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
    axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${API_KEY}`)
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
    axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${API_KEY}`)
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

// TASK 13

// https://stackabuse.com/get-http-post-body-in-express-js/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/addMovie', (req, res) => {
    console.log('Got body:', req.body);
    //res.sendStatus(200);
    let movie = req.body;
    const sql = `INSERT INTO favMovies (title, release_date, poster_path, overview, comment) VALUES ($1, $2, $3, $4, $5)`;
    console.log(`sql=${sql}`);
    let values = [movie.title, movie.release_date, movie.poster_path, movie.overview, movie.comment];
    dbClient.query(sql, values).then((d) => {
        console.log(`query done`);
        return res.sendStatus(201);
    }).catch(function (error) {
        // handle error
        console.log(error);
        res.sendStatus(500).send("error while adding movie to database: " + error)
    });
});

app.get('/getMovies', (req, res) => {
    console.log("/getMovies()")

    const sql=`SELECT * FROM favMovies`;

    dbClient.query(sql).then(data =>{
       return res.status(200).json(data.rows);
    }).catch(function (error) {
        // handle error
        console.log(error);
        res.status(500).send("error while get all movies from database, error: " + error)
    });
});

//==================

// TASK 14

app.put('/UPDATE/:id', (req, res) => {
    console.log("/UPDATE," + req.params.id);
    console.log("movie: " + req.body);
    const id = req.params.id;
    const movie = req.body;
    const sql = `UPDATE favMovies SET comment=$1 WHERE ${id}`
    dbClient.query(sql, [movie.comment]).then(data => {
        return res.sendStatus(202);
    }).catch(function (error) {
        // handle error
        console.log(error);
        res.sendStatus(500).send("error while updating movie comments by id, error: " + error)
    });
});

app.delete('/DELETE/:id', (req, res) => {
    console.log("/DELETE," + req.params.id);
    const id = req.params.id;
    const sql = `DELETE FROM favMovies WHERE ${id} ;`
    dbClient.query(sql, [movie.comment]).then(data => {
        return res.sendStatus(202);
    }).catch(function (error) {
        // handle error
        console.log(error);
        res.sendStatus(500).send("error while deleting movie by id from database, error: " + error)
    });
});

app.get('/getMovie/:id', (req, res) => {
    console.log("/getMovie," + req.params.id);
    const sql = `SELECT * FROM favMovies WHERE ${req.params.id}`;
    dbClient.query(sql).then(data => {
        return res.status(200).json(data.rows);
    }).catch(function (error) {
        // handle error
        console.log(error);
        res.status(500).send("error while getting movie from database by id, error: " + error)
    });
});

//==================

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

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});