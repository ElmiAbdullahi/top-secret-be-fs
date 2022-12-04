
-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users2 CASCADE;
DROP TABLE IF EXISTS secrets CASCADE;

CREATE TABLE users2 (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR UNIQUE,
    password_hash TEXT NOT NULL
);

DROP TABLE IF EXISTS secrets;

CREATE TABLE secrets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO secrets(title, description)

VALUES
('positive thoughts', 'repeat I can do this'),
('You wont believe me', '2pac is still alive');











