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

## Project Features
- Sends json object with movie info
- Shows the favorite page
- Handels 404 and 500 errors
- Getting the latest trending movie
- Search for movies by name
- Search for movies by id 
- Get movie revenue amount in USD