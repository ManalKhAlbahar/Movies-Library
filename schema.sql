
CREATE TABLE IF NOT EXISTS favMovies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(10000),
    poster_path VARCHAR(10000),
    overview VARCHAR(1000),
    comment VARCHAR(1000)
)