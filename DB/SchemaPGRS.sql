DROP TABLE questions

CREATE TABLE IF NOT EXISTS questions (
  question_id INTEGER NOT NULL PRIMARY KEY,
  product_id integer NOT NULL,
  body varchar(3000) NOT NULL,
  date_written DATE NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN NOT NULL,
  question_helpfulness INTEGER NOT NULL,
  answer_id INTEGER NOT NULL REFERENCES answers(answer_id),
);

DROP TABLE answers

CREATE TABLE IF NOT EXISTS answers (
  answer_id INTEGER NOT NULL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES questions(question_id),
  body VARCHAR(3000) NOT NULL,
  date_written DATE NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfulness INTEGER NOT NULL,
  photo_id INTEGER REFERENCES photos(photo_id),
);

DROP TABLE photos

CREATE TABLE IF NOT EXISTS photos(
  photo_id INTEGER NOT NULL PRIMARY KEY,
  answer_id INTEGER NOT NULL REFERENCES answers(answer_id),
  url VARCHAR(300) NOT NULL,
)
