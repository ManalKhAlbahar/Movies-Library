# Movies-Library - V0.2

**Author Name**: Manal Albahar

## WRRC
![WRRC](/Images/WRRC.png)

## Overview

## Getting Started

- run the server by calling 'node server.js'
- in your browser open "http://localhost:3000/" to see the home page that loads th data.json file
- open "http://localhost:3000/favorite" to see the favorite page
- Open "http://localhost:3000/trending" to see the latest trending movie info
- Use "http://localhost:3000/search?q=MOVIE_NAME" to search for movies by name (q), eg: "http://localhost:3000/search?q=sing" to search for movies that contains "sing" in there name.
- Use "http://localhost:3000/search_by_id?id=MOVIE_ID" to search for a movie by its id (id), eg: "http://localhost:3000/search_by_id?id=634649" to get 'spider man' movie information
- Use "http://localhost:3000/revnue?id=MOVIE_ID" to get movie revenue by its id  (id), eg: "http://localhost:3000/revnue?id=634649" will return the revenue of the 'spider man' movie.
- Send POST request to "http://localhost:3000/addMovie" with json body containg the movie info to be added with your personal comments, eg: {
    "title": "Spider-Man: No Way Home",
    "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "overview": "Another spiderman movie",
    "release_date":"10/20222",
    "comment":"I Hate it -_-"
}

- Use "http://localhost:3000/getMovies" to get all movies from the database.

- Send a PUT Requset to "http://localhost:3000/UPDATE/id" to update your comments with json body containing the new comments, eg: PUT:"http://localhost:3000/UPDATE/id=3", body: {"comment": "Not bad"}.
- Send a DELETE Request to "http://localhost:3000/DELETE/id" to delete movie from database by its id. eg: DELETE:"http://localhost:3000/DELETE/id=3" to delte movie with id 3;

- Use "http://localhost:3000/getMovie/id" to get a movie from database by id. eg: "http://localhost:3000/getMovie/id=3"

## Project Features
- Sends json object with movie info
- Shows the favorite page
- Handels 404 and 500 errors
- Getting the latest trending movie
- Search for movies by name
- Search for movies by id 
- Get movie revenue amount in USD