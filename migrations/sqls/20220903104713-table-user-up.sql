CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(255)
);